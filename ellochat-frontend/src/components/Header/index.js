import React from 'react';
import './styles.css';

export default function Header() {
    return (
        <header className="header text-center text-lg-start">
            <div className="text-center p-3 text-blue">
                <span className="text-blue"> Bem vindo ao Ellochat, o novo web chat do momento</span>
            </div>
        </header>
    );
}