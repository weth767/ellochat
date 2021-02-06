import React from 'react';
import './styles.css';

export default function Footer() {
    const currentYear = new Date().getFullYear();
    return (
        <footer className="footer text-center text-lg-start">
            <div className="text-center p-3 text-blue">
                © {currentYear} Copyright:
                <span className="text-blue"> Desenvolvido por João Paulo de Souza e Leandro Souza Pinheiro</span>
            </div>
        </footer>
    );
}