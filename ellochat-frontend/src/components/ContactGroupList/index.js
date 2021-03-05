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
                docs.forEach(contact => {
                    messages.doc(user.userEmail).collection("contacts")
                        .doc(contact.data().email).collection("messages")
                        .orderBy("datetime", "desc").limit(1).onSnapshot(messageData => {
                            let lastMessage = messageData.docChanges().map(data => data.doc.data());
                            lastMessage = lastMessage[lastMessage.length - 1];
                            console.log(lastMessage);
                            if (lastMessage.sender !== user.userEmail) NotificationManager.info(lastMessage.message,
                                lastMessage.sender + " enviou uma mensagem");
                            let messages = [];
                            messageData.docs.forEach(doc => messages.push(doc.data()));
                            if (messages.length !== 0) setChats(messages);
                        });
                });
            });
            setDataLoaded(true);
        }
    }, [chats, user, dataLoaded]);

    return (
        <div className="contact-group-list">
            {chats.map((chat, index) => chat && (
                index === chats.length - 1 ?
                    <ContactInfo key={index}
                        contactName={chat.contactname}
                        lastMessage={chat.type === "image" ? "Imagem" :
                            chat.type === "audio" ? "Áudio" : chat.message}
                        onClick={() => newChatCallback({
                            email: chat.contactemail,
                            username: chat.contactname
                        })}
                    /> : null
            ))
            }
            <NotificationContainer>
            </NotificationContainer>
        </div>

    )
}