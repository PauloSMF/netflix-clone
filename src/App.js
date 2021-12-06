/* eslint-disable import/no-anonymous-default-export */
import React from "react";
//Hooks
import { useEffect, useState } from "react";
//API
import ApiTmdb from "./api/ApiTmdb";
//Componentes
import MoviePosters from "./components/MoviePosters";
import FeaturedMovie from "./components/FeaturedMovie";
import Header from "./components/Header";
//Styles
import './globals.scss'
import './App.scss'

export default () => {
  //Componente de função em que é necessário alterar estado
  //Usa-se o hook useState para gerenciar o estado
  const [ movieList, setMovieList] = useState([]);
  const [ featuredData, setFeaturedData ] = useState(null);
  const [ headerBg, setHeaderBg ] = useState(null);

  //Execução de uma função quando a tela é renderizada
  useEffect(() => {
    const loadAll = async () => {
      //Get - recuperando lista de filmes
      let apiResponse = await ApiTmdb.getHomeList();
      setMovieList(apiResponse);
      //Recuperando filme em destaque
      //Este é original da netflix, filtrando pelo slug
      let originals = apiResponse.filter(i => i.slug === 'originals');
      //Escolhendo item aleatório
      let randomChosen = Math.floor(Math.random() * (originals[0].items.results.length - 1));
      let chosenMovie = originals[0].items.results[randomChosen];;
      let chosenInfo = await ApiTmdb.getMovieInfo(chosenMovie.id, 'tv');
      setFeaturedData(chosenInfo);
    }

    loadAll();
  }, []);

  //Monitoramento do scroll
  useEffect(() => {
    const scrollListener = () => {
      if(window.scrollY > 10) {
        setHeaderBg(true);
      } else {
        setHeaderBg(false);
      }
    }

    window.addEventListener('scroll', scrollListener);
    
    return () => {
      window.removeEventListener('scroll', scrollListener);
    }
  }, [])

  return (
    <div className="moviePage">
      <Header headerBg={headerBg} />
      {featuredData && <FeaturedMovie item={featuredData} />}
      <section className="lists">
        {movieList.map((item, key) => (
          <MoviePosters 
            key={key} 
            title={item.title} 
            items={item.items} 
          />
        ))}
      </section>
      {/*Créditos*/}
      <footer>
        <div>Baseado na aula ofertada por Bonieky Lacerda. <a href="https://www.youtube.com/watch?v=tBweoUiMsDg">Clique para acessar.</a></div>
        <div>Direitos de imagem para a Netflix.</div>
        <div>Dados e API pertencentes à Themoviedb.org</div>
        <div>Projeto para fins didáticos apenas</div>
      </footer>
      
      {movieList.length <= 0 &&
        <div className="loading">
          <img src="https://media.filmelier.com/noticias/br/2020/03/Netflix_LoadTime.gif" alt="Carregando" />
        </div>
      }
    </div>
  );
}