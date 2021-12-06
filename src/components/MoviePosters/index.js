/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable import/no-anonymous-default-export */
import React, { useState } from "react";
//Styeles
import './MoviePosters.scss'
//MaterialUI
import NavigateBeforeIcon from '@material-ui/icons/NavigateBefore';
import NavigateNextIcon from '@material-ui/icons/NavigateNext';

export default ({ title, items }) => {
    const [scrollList, setScrollList] = useState(0);
    //Rolagem da lista
    const handleBefore = () => {
        //Rolando metade da tela
        let xPosition = scrollList + Math.round(window.innerWidth / 2);

        if(xPosition > 0) {
            xPosition = 0;
        }

        setScrollList(xPosition);
    }
    const handleNext = () => {
        let xPosition = scrollList - Math.round(window.innerWidth / 2);
        let listWidth = items.results.length * 150;

        if(window.innerWidth - listWidth > xPosition) {
            //Tamanho da tela - largura da lista - paddings
            xPosition = window.innerWidth - listWidth - 60;
        }

        setScrollList(xPosition);
    }

    return (
        <div className="moviePosters">
            <h2>{title}</h2>
            <div className="moviePosters--navigateBefore" onClick={handleBefore}>
                <NavigateBeforeIcon style={{fontSize: 50}} />
            </div>
            <div className="moviePosters--navigateNext" onClick={handleNext}>
                <NavigateNextIcon style={{fontSize: 50}} />
            </div>
            <div className="moviePosters--listArea">
                <div className="moviePosters--list" 
                    style={{marginLeft: scrollList,
                        width: items.results.length * 150
                }}>
                    { items.results.length > 0 
                    && items.results.map((item, key) => (
                        <div key={key} className="moviePosters--item">
                            <img src={`https://image.tmdb.org/t/p/w300${item.poster_path}`} alt={item.original_title} />
                        </div>
                    ))}
                </div>    
            </div>
        </div>
    );
}