import React, { useEffect, useState, useRef } from 'react';
import './styles.css';
import { MdAccountCircle, MdAttachFile, MdSend, MdMic }  from 'react-icons/md';
import firebase from "../../config/firebase";
import BlockUi from "react-block-ui";
import "react-block-ui/style.css";
import { useSelector } from 'react-redux';
import { messages } from '../../config/firebaseroutes';

export default function ChatComponent(props) {

    const database = firebase.database();
    const user = useSelector(state => state.user);
    const [blocking, setBlocking] = useState(false);
    const [contact, setContact] = useState(undefined);
    const [isNewChat, setIsNewChat] = useState(false);
    const [message, setMessage] = useState("");
    const [userHash, setUserHash] = useState("");
    const [contactHash, setContactHash] = useState("");
    const messagesRef = useRef();
    const [chats, setChats] = useState(undefined);
    
    useEffect(() => {
        messages.doc(user.userEmail).collection("contacts")
                .doc(props.contact.email).collection("messages")
                .orderBy("datetime", "asc").get().then(async messageData => {
                    await setChats(messageData.docs.map(doc => doc.data()));
                });
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
                // setMessages(messageList);
                adjustText();
            }
            setBlocking(false);
        });
    }

    async function sendMessage() {
        const date = new Date();
        setBlocking(true);
        const m = {   
            sender: user.userEmail,
            message: message,
            datetime: date.getTime()
        }
        await messages.doc(user.userEmail).collection("contacts")
                .doc(props.contact.email).collection("messages").add(m);
        await messages.doc(props.contact.email).collection("contacts")
                .doc(user.userEmail).collection("messages").add(m);
        setBlocking(false);
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
                        {chats.map(m => (
                            <li key={m.datetime} ref={messagesRef}
                                className={m.sender === user.userEmail ? 'chat-content-sender' : 'chat-content-receiver'}>
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