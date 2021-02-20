import React, { useState } from 'react';
import './styles.css';
import firebase from "../../config/firebase";
import BlockUi from "react-block-ui";
import "react-block-ui/style.css";
import { useSelector } from 'react-redux';
import "react-notifications/lib/notifications.css";
import {
  NotificationContainer,
  NotificationManager,
} from "react-notifications";
import HashGenerator from '../../utils/hash';

export default function AddContact() {

    const [contactEmail, setContactEmail] = useState('');
    const [blocking, setBlocking] = useState(false);
    const database = firebase.database();
    const userEmail = useSelector(state => state.user.userEmail);

    function addContact() {
        setBlocking(true);
        HashGenerator.generateHash(contactEmail).then((contactHash) => {
            database.ref(`users/${contactHash}`).on('value', snapshot => {
                if (!snapshot.val()) {
                    NotificationManager.error("E-mail do contato não encontrado", "Erro", 1000, () => {});
                    return;
                }
                HashGenerator.generateHash(userEmail).then(result => {
                    database.ref(`users/${result}/contacts/${contactHash}`).set({
                        email: snapshot.val().email,
                        username: snapshot.val().username,
                        nickname: snapshot.val().nickname,
                        name: snapshot.val().name
                    }).then(_ => {
                        NotificationManager.success(
                            "Contato cadastrado com sucesso", "Sucesso!",
                            1000, () => {});
                    });
                }, _ => {
                    NotificationManager.error("Erro ao adicionar o contato", "Erro", 1000, () => {});
                }).finally(() => {
                    setBlocking(false);
                });
            });
        }).finally(() => {
            setBlocking(false);
        });
    }

    return (
        <BlockUi tag="div" blocking={blocking}>
            <div className="modal" id="addContact" tabIndex="-1" role="dialog"
                aria-labelledby="addContactTitle" aria-hidden="true">
                <div className="modal-dialog modal-dialog-centered modal-lg" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h3 className="h3 mb-3 font-weight-bold text-blue"> Contatos </h3>
                            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div className="modal-body">
                            <div className="row">
                                <div className="col-12 col-md-12">
                                    <label htmlFor="email">E-mail</label>
                                    <input type="text" className="form-control text-blue" id="email"
                                        placeholder="Digite o e-mail do contato"
                                        onChange={(event) => setContactEmail(event.target.value)} />
                                </div>
                            </div>
                            <div className="modal-footer mt-3 ">
                                <button type="button" className="btn btn-danger" data-dismiss="modal">Fechar</button>
                                <button type="button" className="btn btn-primary"
                                    onClick={() => addContact()}>Adicionar Contato</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <NotificationContainer />
        </BlockUi>
    );
}