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

export default function Register() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");

  const history = useHistory();
  const [blocking, setBlocking] = useState(false);

  const database = firebase.database();

  function handleNewUser() {
    setBlocking(true);
    firebase.auth()
      .createUserWithEmailAndPassword(email, password)
      .then((result) => {
        database
          .ref(`users/${result.user.uid}`)
          .set({
            username: username,
            email: email,
            phone: phone,
            password: password,
          }).then(() => {
            NotificationManager.success(
              "Usuário cadastrado com sucesso", "Sucesso!",
              500, () => {});
              history.push("/home");
          }, (error) => {
            NotificationManager.warning(
              "Erro ao realizar o cadastro do usuário, tente novamente!", "Erro",
              500, () => { }
            );
          }).finally(() => {
            setBlocking(false);
          });
      }, (error) => {
        NotificationManager.warning(
          "Endereço de e-mail já cadastrado", "Erro",
          500, () => { }
        );
      }).finally(() => {
        setBlocking(false);
      });
  }

  return (
    <BlockUi tag="div" className="register-content" blocking={blocking}>
      <img src={Logo} className="register-logo" />
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
            <Link to="/" className="register-link">
              Tenho uma conta
            </Link>
          </div>
        </div>
      </form>
      <NotificationContainer />
    </BlockUi>
  );
}
