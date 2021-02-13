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
import InputMask from "react-input-mask";
import Footer from '../../components/Footer';
import Header from '../../components/Header';
import Messages from '../../constants/messages';
import { useDispatch } from 'react-redux';
import HashGenerator from '../../utils/hash';

export default function Register() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [token, setToken] = useState("");

  const history = useHistory();
  const [blocking, setBlocking] = useState(false);

  const database = firebase.database();
  const dispatch = useDispatch();

  async function generateToken(uid) {
    await setToken("");
  }

  function handleNewUser() {
    setBlocking(true);
    firebase.auth()
        .createUserWithEmailAndPassword(email, password)
        .then((result) => {
            HashGenerator.generateHash(email).then(userEmailHash => {
            database.ref(`users/${userEmailHash}`).set({
                uid: result.user.uid,
                username: username,
                name: "",
                nickname: "",
                email: email,
                phone: phone,
                status: ""
            }).then(() => {
                generateToken(result.user.uid);
                dispatch({
                    type: 'LOGIN',
                    payload: {
                        uid: result.user.uid,
                        userEmail: email,
                        username: username,
                        token: token //resolver o token
                    }
                });
                NotificationManager.success(
                  "Usuário cadastrado com sucesso", "Sucesso!",
                  1000, () => { });
                history.push("/home");
            }, (error) => {
                NotificationManager.error(
                  Messages.getBrazilianPortgueseMessageRegister(error.code), "Erro",
                1000, () => {});
          });
        }).finally(() => {
          setBlocking(false);
        });
      }, (error) => {
          NotificationManager.error(
            Messages.getBrazilianPortgueseMessageRegister(error.code), "Erro",
            1000, () => { }
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
