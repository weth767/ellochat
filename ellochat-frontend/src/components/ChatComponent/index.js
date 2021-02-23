import React, { useEffect, useState, useRef } from 'react';
import './styles.css';
import { MdAccountCircle, MdAttachFile, MdSend, MdMic }  from 'react-icons/md';
import firebase from "../../config/firebase";
import BlockUi from "react-block-ui";
import "react-block-ui/style.css";
import { useSelector } from 'react-redux';
import HashGenerator from '../../utils/hash';

export default function ChatComponent(props) {

    const database = firebase.database();
    const user = useSelector(state => state.user);
    const [blocking, setBlocking] = useState(false);
    const [contact, setContact] = useState(undefined);
    const [isNewChat, setIsNewChat] = useState(false);
    const [message, setMessage] = useState("");
    const [userHash, setUserHash] = useState("");
    const [contactHash, setContactHash] = useState("");
    const [messages, setMessages] = useState([]);
    const messagesRef = useRef();
    
    useEffect(() => {
        setIsNewChat(props.isNewChat);
        if (isNewChat) {
            setContact(props.contact);    
            HashGenerator.generateHash(user.userEmail).then((userEmailHash) => {
                setUserHash(userEmailHash);
                HashGenerator.generateHash(props.contact.email).then((contactEmailHash) => {
                    setContactHash(contactEmailHash);
                    loadData();
                });
            });
        } else {
            loadData();
        }
        
    }, [props, user, contact, isNewChat]);

    function adjustText() {
        if (messagesRef.current) {
            messagesRef.current.scrollIntoView({
                behavior: "smooth",
                block: "start",
            });
        }
    }

    function loadData() {
        setBlocking(true);
        database.ref(`users/${userHash}/chats/${contactHash}`).on('value', snapshot => {
            let messageList = snapshot.toJSON();
            if (messageList) {
                messageList = Object.values(messageList)
                messageList.sort((m1, m2) => {
                    if (m1.datetime > m2.datetime) {
                        return 1;
                    }
                    return -1;
                })
                setMessages(messageList);
                adjustText();
            }
            setBlocking(false);
        });
    }

    function sendMessage() {
        const date = new Date();
        setBlocking(true);
        HashGenerator.generateHash(date.getTime().toString()).then(dateHash => {
            database.ref(`users/${userHash}/chats/${contactHash}/${dateHash}`).set({
                sender: true,
                message: message,
                datetime: date.getTime(),
                viewed: false,
                contact: contact.username,
                email: contact.email,
            }).finally(() => {
                database.ref(`users/${contactHash}/chats/${userHash}/${dateHash}`).set({
                    sender: false,
                    message: message,
                    datetime: date.getTime(),
                    viewed: false,
                    contact: user.username,
                    email: user.email, 
                }).finally(() => {
                    setBlocking(false);
                    document.getElementById("input").value = "";
                    loadData();
                });
            });
        });
    }

    return (
        <BlockUi tag="div" blocking={blocking}>
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
                    <ul>
                        {messages.map(m => (
                            <li key={m.datetime} ref={messagesRef}
                                className={m.sender ? 'chat-content-sender' : 'chat-content-receiver'}>
                                <span className={m.sender ? 'chat-content-sender-text' :
                                     'chat-content-receiver-text'}>{m.message}</span>
                            </li>
                        ))}
                    </ul>
                </div>
                <div className="chat-input">
                    <div className="chat-input-attach">
                        <label htmlFor="file-input">
                            <MdAttachFile color="white" className="chat-input-icons"/>
                        </label>
                        <input id="file-input" type="file"/>
                    </div>
                    <div className="chat-input-wrapper">
                        <input className="chat-input-input" id="input" placeholder="Digite uma mensagem" 
                            onChange={e => setMessage(e.target.value)} 
                            onKeyPress={e => e.key === 'Enter' ? sendMessage() : null}/>
                    </div>
                    <div className="chat-input-interactions">
                        <button type="button" className="chat-input-buttons">
                            <MdMic color="white" className="chat-input-icons"/>
                        </button>
                        <button type="button" className="chat-input-buttons" 
                            onClick={() => sendMessage()}
                            >
                            <MdSend color="white" className="chat-input-icons"/>
                        </button>
                    </div>
                </div>
            </div>
        </BlockUi>
    );
}