import React, { useEffect, useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import './styles.css';
import { MdAccountCircle, MdAttachFile, MdSend, MdMic }  from 'react-icons/md';
import BlockUi from "react-block-ui";
import "react-block-ui/style.css";
import { useSelector } from 'react-redux';
import { messages } from '../../config/firebaseroutes';
import AudioRecorder from '../AudioRecorder';

export default function ChatComponent(props) {
    const user = useSelector(state => state.user);
    const [blocking, setBlocking] = useState(false);
    const [message, setMessage] = useState("");
    const messagesRef = useRef();
    const [chats, setChats] = useState([]);
    
    useEffect(() => {
        setBlocking(true);
        messages.doc(user.userEmail).collection("contacts")
                .doc(props.contact.email).collection("messages")
                .orderBy("datetime", "asc").onSnapshot(async messageData => {
                    await setChats(messageData.docs.map(doc => doc.data()));
                    if (messagesRef.current) {
                        messagesRef.current.scrollIntoView({
                            behavior: "smooth",
                            block: "start",
                        });
                    }
                    setBlocking(false);
                });
    }, [props, user]);

    const handleAudioRecorder = (audio) => {
        console.log(audio);
        sendFile(audio, "audio");
    }

    function sendFile(file, type) {
        setBlocking(true);
        const date = new Date();
        const reader = new FileReader();
        reader.onloadend = () => {
            const m1 = {   
                sender: user.userEmail,
                message: reader.result,
                datetime: date.getTime(),
                contactname: props.contact.username,
                contactemail: props.contact.email,
                type: type
            }
            const m2 = {   
                sender: user.userEmail,
                message: reader.result,
                datetime: date.getTime(),
                contactname: user.username,
                contactemail: user.userEmail,
                type: type
            }
            document.getElementById("input").value = "";
            messages.doc(user.userEmail).collection("contacts")
                .doc(props.contact.email).collection("messages").add(m1).finally(() => {
                    messages.doc(props.contact.email).collection("contacts")
                        .doc(user.userEmail).collection("messages").add(m2).finally(() => {
                            setBlocking(false);
                            if (messagesRef.current) {
                                messagesRef.current.scrollIntoView({
                                    behavior: "smooth",
                                    block: "start",
                            });
                        }
                    });
                });
        }
        reader.readAsDataURL(file[0]);
    }

    function sendMessage() {
        setBlocking(true);
        const date = new Date();
        const m1 = {   
            sender: user.userEmail,
            message: message,
            datetime: date.getTime(),
            contactname: props.contact.username,
            contactemail: props.contact.email,
            type: "text"
        }
        const m2 = {   
            sender: user.userEmail,
            message: message,
            datetime: date.getTime(),
            contactname: user.username,
            contactemail: user.userEmail,
            type: "text"
        }
        document.getElementById("input").value = "";
        messages.doc(user.userEmail).collection("contacts")
            .doc(props.contact.email).collection("messages").add(m1).finally(() => {
                messages.doc(props.contact.email).collection("contacts")
                    .doc(user.userEmail).collection("messages").add(m2).finally(() => {
                        setBlocking(false);
                        if (messagesRef.current) {
                            messagesRef.current.scrollIntoView({
                                behavior: "smooth",
                                block: "start",
                        });
                    }
                });
            });
    }

    function messageComponent(m) {
        return <span className={m.sender === user.userEmail ? 'chat-content-sender-text' :
        'chat-content-receiver-text'}>{m.message}</span>;
    }

    function imageComponent(m) {
        <img src={m.message} alt={"image" + m.datetime} 
             className={m.sender === user.userEmail ? 'chat-content-sender-text' : 
            'chat-content-receiver'}
        />
    }

    function audioComponent(m) {
        <audio src={m.message} controls />
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
                                {m.type === "image" ? 
                                       imageComponent(m)  : 
                                m.type === "audio" ?  audioComponent(m) :
                                    messageComponent(m)}
                            </li>
                        ))}
                    </ul>
                </div>
                <div className="chat-input">
                    <div className="chat-input-attach">
                        <label htmlFor="file-input">
                            <MdAttachFile color="white" className="chat-input-icons"/>
                        </label>
                        <input id="file-input" type="file" onChange={e => sendFile(e.target.files, "image")}/>
                    </div>
                    <div className="chat-input-wrapper">
                        <input className="chat-input-input" id="input" placeholder="Digite uma mensagem" 
                            onChange={e => setMessage(e.target.value)} 
                            onKeyPress={e => e.key === 'Enter' ? sendMessage() : null}/>
                    </div>
                    <div className="chat-input-interactions">
                        <Link to="/" data-toggle="modal" data-target="#audioRecovery" 
                                    className="chat-input-buttons">
                            <MdMic color="white" className="chat-input-icons"/>
                        </Link>
                        <button type="button" className="chat-input-buttons" 
                            onClick={() => sendMessage()}
                            >
                            <MdSend color="white" className="chat-input-icons"/>
                        </button>
                    </div>
                </div>
            </div>
            <AudioRecorder audioRecorderCallback={handleAudioRecorder}/>
        </BlockUi>
    );
}