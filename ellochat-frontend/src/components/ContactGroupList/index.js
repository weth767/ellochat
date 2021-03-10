import React, { useEffect, useState } from 'react';
import './styles.css';
import ContactInfo from '../ContactInfo';
import { useSelector } from 'react-redux';
import { users, messages } from '../../config/firebaseroutes';
import 'react-notifications/lib/notifications.css';
import { NotificationContainer, NotificationManager } from 'react-notifications';

export default function ContactGroupList({ newChatCallback }) {
    const [chats, setChats] = useState([]);
    const user = useSelector(state => state.user);
    const [dataLoaded, setDataLoaded] = useState(false);

    useEffect(() => {
        if (!dataLoaded) {
            users.doc(user.userEmail).collection('contacts').get().then((docs) => {
                let chatMessages = [];
                docs.forEach(contact => {
                    messages.doc(user.userEmail).collection("contacts")
                        .doc(contact.data().email).collection("messages")
                        .orderBy("datetime", "asc").onSnapshot(messageData => {
                            let lastMessage = messageData.docChanges().map(data => data.doc.data());
                            lastMessage = lastMessage[lastMessage.length - 1];
                            if (lastMessage.sender !== user.userEmail) NotificationManager.info(lastMessage.message,
                                lastMessage.sender + " enviou uma mensagem");
                            chatMessages.push(messageData.docs.map(doc => doc.data()));
                        });
                });
                console.log(chatMessages);
                setChats(chatMessages);
            });
            setDataLoaded(true);
        }
    }, [chats, user, dataLoaded]);

    return (
        <div className="contact-group-list">
            {chats.map((chat, index) => chat && (
                <ContactInfo key={index}
                    contactName={chat[chat.length - 1].contactname}
                    lastMessage={chat[chat.length - 1].type === "image" ? "Imagem" :
                        chat[chat.length - 1].type === "audio" ? "Áudio" : 
                        chat[chat.length - 1].message}
                    onClick={() => newChatCallback({
                        email: chat[chat.length - 1].contactemail,
                        username: chat[chat.length - 1].contactname
                    })}
                />
            ))
            }
            <NotificationContainer>
            </NotificationContainer>
        </div>

    )
}