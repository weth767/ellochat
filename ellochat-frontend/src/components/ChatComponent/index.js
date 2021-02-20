import React from 'react';
import './styles.css';
import { MdAccountCircle, MdAttachFile, MdSend, MdMic }  from 'react-icons/md';

export default function ChatComponent(props) {
    return (
        <div className="chat">
            <div className="chat-header">
                {props.image ?
                    <img src={props.image} alt="imagem do usuário" /> :
                    <MdAccountCircle color="white" className="user-icon" />
                }
                <span>{props.contactName}</span>
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