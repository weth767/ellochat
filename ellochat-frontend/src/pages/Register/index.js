import React, { useState } from 'react';
import './styles.css';
import Logo from '../../assets/ellochat-logo.png';
import firebase from '../../config/firebase';
import 'firebase/auth';
import BlockUi from 'react-block-ui';
import 'react-block-ui/style.css';
import 'react-notifications/lib/notifications.css';
import {NotificationContainer, NotificationManager} from 'react-notifications';
import {Link, useHistory} from 'react-router-dom'
import InputMask from "react-input-mask";

export default function Register() {
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [password, setPassword] = useState("");
    const db = firebase.database();

    const history = useHistory();
    const [blocking, setBlocking] = useState(false);

    function handleNewUser() {
        setBlocking(true);
        firebase.auth()
            .createUserWithEmailAndPassword(email, password)
            .then(() => {
                db.ref(`users/${email}`).set({
                    username: username,
                    email: email,
                    phone: phone,
                    password: password
                }).then(() => {
                    NotificationManager.success('Usuário cadastrado com sucesso', 'Sucesso!', 500, () => {
                        history.push("/");
                    }).finally(() => {
                        setBlocking(false);
                    });;
                }).finally(() => {
                    setBlocking(false);
                });
            })
    }

    return (
        <BlockUi tag="div" blocking={blocking}>
            <div className="register-content d-flex align-items-center text-center">
                <form className="form-signin mx-auto">
                    <div className="register-card register-form-border">
                        <h1 className="h3 mb-3 font-weight-bold register-title">Cadastrar</h1>
                        <input type="text" id="username" className="form-control my-2 register-input" 
                            placeholder="Digite seu nome de usuário" onChange={event => setUsername(event.target.value)}/>
                        <input type="email" id="email" className="form-control my-2 register-input" 
                            placeholder="Digite seu e-mail" onChange={event => setEmail(event.target.value)}/>
                        <InputMask mask="(99) 99999-9999" className="form-control my-2 register-input" placeholder="Digite seu telefone" onChange={event => setPhone(event.target.value)}/>
                        <input type="password" id="password" className="form-control my-2 register-input" 
                            placeholder="Digite sua senha" onChange={event => setPassword(event.target.value)}/>
                        <button className="btn btn-lg register-button btn-block" type="button" onClick={() => handleNewUser()}>
                            Cadastrar
                        </button>
                        <div className="register-options my-5">
                            <Link to="/" className="mx-2 register-link">Tenho uma conta</Link>
                        </div>
                    </div>
                </form>
            </div>
            <NotificationContainer/>
        </BlockUi>
    );
}