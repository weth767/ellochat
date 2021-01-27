import React from 'react';
import Logo from '../../assets/ellochat-logo.svg';
import './styles.css';

export default function Login() {
    return (
        <div className="ui-g-12">
            <div>
                <img src={Logo} alt="Imagem de logotipo"/>
            </div>
        </div>
    );
}