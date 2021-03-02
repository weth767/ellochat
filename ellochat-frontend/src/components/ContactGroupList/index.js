import React, { useEffect, useState } from 'react';
import './styles.css';
import ContactInfo from '../ContactInfo';
import { useSelector } from 'react-redux';
import { users, messages } from '../../config/firebaseroutes';

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
                    .orderBy("datetime", "asc").onSnapshot(async messageData => {
                        setChats(messageData.docs.map(doc => doc.data()));
                    });
                });
            });
            setDataLoaded(true);
        }
        
    }, [chats, user, dataLoaded]);

    return (
        <div className="contact-group-list">
            {chats.length > 0 ? chats.map(chat => (
                <ContactInfo key={chat[chat.length - 1].datetime}
                    contactName={chat[chat.length - 1].contactname}
                    lastMessage={chat[chat.length - 1].message}
                    onClick={() => newChatCallback({
                        email: chat[chat.length - 1].contactemail,
                        username: chat[chat.length - 1].contactname
                    })}
                />
            )): null}
        </div>
    )
}