import React, { useEffect, useState } from 'react';
import './styles.css';
import ContactInfo from '../ContactInfo';
import firebase from "../../config/firebase";
import { useSelector } from 'react-redux';
import HashGenerator from '../../utils/hash';

export default function ContactGroupList({newChatCallback}) {
    const [chats, setChats] = useState([]);
    const database = firebase.database();
    const user = useSelector(state => state.user);
    
    useEffect(() => {
        if (Array.isArray(chats) && chats.length === 0) {
            HashGenerator.generateHash(user.userEmail).then(userEmailHash => {
                database.ref(`users/${userEmailHash}/chats`).on('value', snapshot => {
                    let chatData = snapshot.toJSON();
                    let chatList = [];
                    if (chatData) {
                        chatData = Object.values(chatData);
                        chatData.forEach(chat => {
                            chatList.push(Object.values(chat));
                        });
                        setChats(chatList);
                        console.log(chats);
                    }
                })
            });
        }
    });

    return (
        <div className="contact-group-list">
            {chats.map(chat => (
                <ContactInfo key={chat[chat.length - 1].datetime} 
                    contactName={chat[chat.length - 1].contact} 
                    lastMessage={chat[chat.length - 1].message}
                    onClick={() => newChatCallback({email: chat[chat.length - 1].email,
                         username: chat[chat.length - 1].contact})}
                />
            ))}
        </div>
    )
}