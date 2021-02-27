import React, { useState, useEffect } from 'react';
import './styles.css';
import "react-block-ui/style.css";
import { useSelector } from 'react-redux';
import { users } from '../../config/firebaseroutes';

export default function ContactList({newChatCallback}) {
    const [contacts, setContacts] = useState([]);
    const userEmail = useSelector(state => state.user.userEmail);
    const [dataLoaded, setDataLoaded] = useState(false);

    useEffect(() => {
        if (!dataLoaded) {
            users.doc(userEmail).collection('contacts').get().then((docs) => {
                let contactList = [];
                docs.forEach(d => {
                    users.doc(d.data().email).get().then((contact) => {
                        contactList.push(contact.data());
                    })
                });
                setContacts(contactList);
            })
        }
    }, [userEmail, dataLoaded]);

    return (
        <div className="modal" id="contactList" tabIndex="-1" role="dialog"
            aria-labelledby="contactListTitle" aria-hidden="true">
            <div className="modal-dialog modal-dialog-centered modal-lg" role="document">
                <div className="modal-content">
                    <div className="modal-header">
                        <h3 className="h3 mb-3 font-weight-bold text-blue"> Contatos </h3>
                        <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div className="contacts">
                        <ul>
                            {contacts.map(contact => (
                                <li key={contact.email}>
                                    <div className="contact-info" onClick={() => newChatCallback(contact)}>
                                        <div className="card-body contact-info-content">
                                            <div className="contact-text">
                                                <h2 className="card-title">
                                                    {contact.username}
                                                </h2>
                                                <span className="card-text">
                                                    {
                                                        contact.status ? contact.status : 
                                                        "Olá, comecei a usar o Ellochat"
                                                    }
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                </li>

                            ))}
                        </ul>  
                        <div className="modal-footer mt-3 ">
                            <button type="button" className="btn btn-danger" data-dismiss="modal">Fechar</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
