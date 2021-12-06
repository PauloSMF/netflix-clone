/* eslint-disable import/no-anonymous-default-export */
import React from "react";
//Styles
import './FeaturedMovie.scss'

export default ({ item }) => {
    let firstDate = new Date(item.first_air_date);
    let genres = [];

    for(let i in item.genres) {
        genres.push( item.genres[i].name );
    }

    return (
        <section className="featured" style={{
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundImage: `url(https://image.tmdb.org/t/p/original${item.backdrop_path})`
        }}>
            <div className="featured--vertical">
                <div className="featured--horizontal">
                    <div className="featured--name">{item.original_name}</div>
                    <div className="featured--info">
                        <div className="featured--info--points">{item.vote_average} pontos</div>
                        <div className="featured--info--year">{firstDate.getFullYear()}</div>
                        <div className="featured--info--seasons">
                            {item.number_of_seasons} temporada{ item.number_of_seasons !== 1 ? 's' : ''}
                        </div>
                    </div>
                    <div className="featured--description">
                        {item.overview}
                    </div>
                    <div className="featured--buttons">
                        <button>► Assistir</button>
                        <button>+ Minha Lista</button>
                    </div>
                    <div className="featured--genres">
                        <strong>Gêneros: </strong>
                        {genres.join(', ')}
                    </div>
                </div>
            </div>
        </section>
    )
}