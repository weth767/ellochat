import React, { useState, useEffect } from 'react';
import './styles.css';
import firebase from "../../config/firebase";
import BlockUi from "react-block-ui";
import "react-block-ui/style.css";
import HashGenerator from '../../utils/hash';
import { useSelector } from 'react-redux';

export default function NewChat() {
    const database = firebase.database();
    const [blocking, setBlocking] = useState(false);
    const [contacts, setContacts] = useState([]);
    const userEmail = useSelector(state => state.user.userEmail);

    useEffect(() => {
        if (Array.isArray(contacts) && contacts.length == 0) {
            setBlocking(true);
            HashGenerator.generateHash(userEmail).then(userEmailHash => {
                database.ref(`users/${userEmailHash}/contacts`).on('value', (snapshot) => {
                    setContacts(Object.values(snapshot.toJSON()));
                    setBlocking(false);
                });
            });
        }
    });

    return (
        <BlockUi tag="div" blocking={blocking}>
            <div className="modal" id="newChat" tabIndex="-1" role="dialog"
                aria-labelledby="newChatTitle" aria-hidden="true">
                <div className="modal-dialog modal-dialog-centered modal-lg" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h3 className="h3 mb-3 font-weight-bold text-blue"> Contatos </h3>
                            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div className="modal-body">
                            {contacts.map(contact => {
                                <div className="card contact-info">
                                    <div className="card-body contact-info-content">
                                        <div className="contact-text">
                                            <h2 className="card-title">{contact.nickname ? contact.nickname : contact.username}</h2>
                                            <span className="card-text">{contact.status}</span>
                                        </div>
                                    </div>
                                </div>
                            })}
                            <div className="modal-footer mt-3 ">
                                <button type="button" className="btn btn-danger" data-dismiss="modal">Fechar</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </BlockUi>
    );
}
