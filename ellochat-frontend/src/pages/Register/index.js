import React, { useState } from "react";
import "./styles.css";
import Logo from "../../assets/ellochat-banner.png";
import firebase from "../../config/firebase";
import "firebase/auth";
import BlockUi from "react-block-ui";
import "react-block-ui/style.css";
import "react-notifications/lib/notifications.css";
import {
  NotificationContainer,
  NotificationManager,
} from "react-notifications";
import { Link, useHistory } from "react-router-dom";
import axios from "axios";
import InputMask from "react-input-mask";
import Footer from '../../components/Footer';
import Header from '../../components/Header';
import Messages from '../../constants/messages';
import { useDispatch } from 'react-redux';
import { users } from '../../config/firebaseroutes';

export default function Register() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const history = useHistory();
  const [blocking, setBlocking] = useState(false);
  const dispatch = useDispatch();
  const storage = firebase.storage();

  const options = {
    method: 'GET',
    url: 'https://ui-avatars.com/api',
    params: {
      name: `${username}`,
      background: 'fff',
      color: '003366',
      rounded: 'true',
    },
    responseType: 'blob'
  };

  async function generateAvatar() {
    const reader = new FileReader();
    await axios.request(options)
        .then(async res => {
          reader.onloadend = () => {
            dispatch({
              type: 'IMAGE',
              payload: {
                  image: reader.result 
              }
            });
          }
          reader.readAsDataURL(res.data);
          await storage.ref(`users-pictures/${email}`).put(res.data);
        });
  }

  async function handleNewUser() {
    setBlocking(true);
    await firebase.auth()
        .createUserWithEmailAndPassword(email, password)
        .then(async (result) => {
          await users.doc(email).set({
            uid: result.user.uid,
            username: username,
            email: email,
            phone: phone,
          });
          dispatch({
            type: 'LOGIN',
            payload: {
              uid: result.user.uid,
              userEmail: email,
              username: username,
              phone: phone,
            }
          });
          await generateAvatar();
          await history.push('/');
        }, (error) => {
          NotificationManager.error(
              Messages.getBrazilianPortgueseMessageRegister(error.code), "Erro",
              1000, () => {}
          );
        }).finally(() => {
          setBlocking(false);
        });
  }

  return (
      <BlockUi tag="div" className="register-content" blocking={blocking}>
        <Header />
        <img src={Logo} className="register-logo" alt="Banner Ellochat" />
        <form className="register-form">
          <div className="register-card">
            <h1 className="register-title">Cadastre-se no Ellochat</h1>
            <input type="text" id="username" className="form-control register-input"
                   placeholder="Digite seu nome de usuário"
                   onChange={(event) => setUsername(event.target.value)}
            />
            <input type="email" id="email" className="form-control register-input"
                   placeholder="Digite seu e-mail"
                   onChange={(event) => setEmail(event.target.value)}
            />
            <InputMask mask="(99) 99999-9999" id="phone" className="form-control register-input"
                       placeholder="Digite seu telefone"
                       onChange={(event) => setPhone(event.target.value)}
            />
            <input type="password" id="password" className="form-control register-input"
                   placeholder="Digite sua senha"
                   onChange={(event) => setPassword(event.target.value)}
            />
            <button className="register-button" type="button"
                    onClick={() => handleNewUser()}
            >
              Cadastrar
            </button>
            <div className="register-options">
              <Link to="/login" className="register-link">
                Tenho uma conta
              </Link>
            </div>
          </div>
        </form>
        <Footer />
        <NotificationContainer />
      </BlockUi>
  );
}
