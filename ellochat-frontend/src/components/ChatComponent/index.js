import React, { useEffect } from 'react';
import './styles.css';
import { MdAccountCircle, MdAttachFile, MdSend, MdMic }  from 'react-icons/md';
import firebase from "../../config/firebase";
import BlockUi from "react-block-ui";
import "react-block-ui/style.css";

export default function ChatComponent(props) {

    const database = firebase.database();
    
    useEffect(() => {
        if (props.isNewChat) {
            
        }
    });

    return (
        <div className="chat">
            <div className="chat-header">
                {props.contact.image ?
                    <img src={props.contact.image} alt="imagem do usuário" /> :
                    <MdAccountCircle color="white" className="user-icon" />
                }
                <span>{props.contact.nickname ? props.contact.nickname 
                : props.contact.username}</span>
            </div>
            <div className="chat-content">
                
            </div>
            <div className="chat-input">
                <div className="chat-input-attach">
                    <label htmlFor="file-input">
                        <MdAttachFile color="white" className="chat-input-icons"/>
                    </label>
                    <input id="file-input" type="file"/>
                </div>
                <div className="chat-input-wrapper">
                    <input className="chat-input-input" placeholder="Digite uma mensagem"/>
                </div>
                <div className="chat-input-interactions">
                    <button type="button" className="chat-input-buttons">
                        <MdMic color="white" className="chat-input-icons"/>
                    </button>
                    <button type="button" className="chat-input-buttons">
                        <MdSend color="white" className="chat-input-icons"/>
                    </button>
                </div>
            </div>
        </div>
    );
}