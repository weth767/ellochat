import React, { useEffect, useState } from 'react';
import './styles.css';
import { MdAccountCircle }  from 'react-icons/md';
import firebase from '../../config/firebase';

export default function ContactInfo(props) {


    const [imageLoaded, setImageLoaded] = useState(false);
    const [image, setImage] = useState(null);

    useEffect(()=> {
        if (!imageLoaded) {
            firebase.storage().ref(`users-pictures/${props.email}`).getDownloadURL()
            .then(image => {
                setImage(image)
            }).finally(() => {
                setImageLoaded(true);
            });
        }
    },[imageLoaded]);

    return (
        <div className="card contact-info">
            <div className="card-body contact-info-content" onClick={() => props.onClick()}>
                <div className="contact-avatar">
                    {image ?
                        <img src={image} alt="imagem do usuário" className="contact-icon"/> :
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