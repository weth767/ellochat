import React from 'react';
import './styles.css';
import { MdAccountCircle }  from 'react-icons/md';

export default function ContactInfo(props) {
    console.log(props);
    return (
        <div className="card contact-info">
            <div className="card-body contact-info-content" onClick={() => props.onClick()}>
                <div className="contact-avatar">
                    {props.image ?
                        <img src={props.image} alt="imagem do usuário" /> :
                        <MdAccountCircle color="black" className="user-icon" />
                    }
                </div>
                <div className="contact-text">
                    <h2 className="card-title">{props.contactName}</h2>
                    <span className="card-text">{props.lastMessage}</span>
                </div>
            </div>
        </div>
    );
}