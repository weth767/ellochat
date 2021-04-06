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
            let contacts = [];
            users.doc(user.userEmail).collection('contacts').get().then((docs) => {
                docs.forEach(contact => {
                    messages.doc(user.userEmail).collection("contacts")
                        .doc(contact.data().email).collection("messages")
                        .orderBy("datetime", "desc").limit(1).onSnapshot(messageData => {
                            let lastMessage = messageData.docChanges().map(data => data.doc.data());
                            if (lastMessage) {
                                lastMessage = lastMessage[lastMessage.length - 1];
                                if (lastMessage.sender !== user.userEmail){
                                    NotificationManager.info(lastMessage.message);
                                }
                                if (!contacts.find(contact => contact.contactemail === lastMessage.contactemail)){
                                    contacts.push(lastMessage);
                                }
                            }
                        });
                });
            });
            setChats(contacts);
            setDataLoaded(true);
        }
    }, [chats, user, dataLoaded]);

    return (
        <div className="contact-group-list">
            {chats.map((chat, index) => chat && (
                <ContactInfo key={index}
                    contactName={chat.contactname}
                    email={chat.contactemail}
                    lastMessage={"Oi, estou usando o Ellochat"}
                    onClick={() => newChatCallback({
                        email: chat.contactemail,
                        username: chat.contactname
                    })}
                /> 
            ))
            }
            <NotificationContainer>
            </NotificationContainer>
        </div>

    )
}
