/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable import/no-anonymous-default-export */
import React from "react";
//Styles
import './Header.scss';

export default ({ headerBg }) => {
    return (
        <header className={ headerBg? 'blackBg' : ''}>
            <div className="logo">
                <a href="/">
                    <img src="https://upload.wikimedia.org/wikipedia/commons/0/08/Netflix_2015_logo.svg" alt="Netflix" />
                </a>
            </div>
            <div className="userIcon">
                <a href="/">
                    <img src="https://mir-s3-cdn-cf.behance.net/project_modules/disp/84c20033850498.56ba69ac290ea.png" alt="Usuário" />
                </a>
            </div>
        </header>
    );
}