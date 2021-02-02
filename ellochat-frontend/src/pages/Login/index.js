import React,{useState} from 'react';
import { Link, useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import 'firebase/auth';
import firebase from '../../config/firebase'
import BlockUi from "react-block-ui";
import "react-block-ui/style.css";
import "react-notifications/lib/notifications.css";
import {
  NotificationContainer,
  NotificationManager,
} from "react-notifications";

import Logo from "../../assets/ellochat-banner.png";
import './styles.css';



export default function Login() {

    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');

    const [blocking, setBlocking] = useState(false);

    const dispatch = useDispatch();
    const history = useHistory();
    
    function handleLogin() {
        setBlocking(true);
        firebase.auth()
        .signInWithEmailAndPassword(email,senha)
        .then(() => {
            dispatch({
                type:'LOG_IN',
                payload:{
                    usuarioEmail:email
                }
            });
            history.push("/home");
        }).catch(() => {
            NotificationManager.warning("Erro ao realizar o login, verifique suas credenciais!", "Erro", 1000);
        }).finally(() => {
            setBlocking(false);
        });
    }

    return (
        <BlockUi tag="div" blocking={blocking}>
            <div className="login-content text-center">
                <form className="mx-auto col-sm-12 col-md-8 col-lg-5">
                    <img src={Logo} className="login-logo" alt=""></img>
                    <div className="card">
                        <div className="row">
                            <div className="col-md-12 d-flex align-items-center flex-column">    
                                <h3 className="h3 mb-3 font-weight-bold text-blue"> Conectar-se </h3>
                                <div className="col-12 col-md-10 ">
                                    <input type="email" className="form-control login-input text-blue" id="inputEmail" aria-describedby="emailHelp" placeholder="E-mail" 
                                    onChange={e => setEmail(e.target.value)} />
                                </div>
                                <div className="col-12 col-md-10 ">
                                    <input type="password" className="form-control login-input text-blue" id="inputPassowrd" placeholder="Senha"
                                        onChange={e => setSenha(e.target.value)}/>
                                </div>
                                <div className="col-12 col-md-10 ">
                                    <button type="button" className="btn btn-lg btn-login btn-block" onClick={handleLogin} >Entrar</button>
                                </div>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-md-12 d-flex align-items-center flex-column">    
                                <div className="col-md-10 d-flex justify-content-between">
                                    <div><Link to ="/recover_password" className="mx-2 text-blue">Esqueci minha senha</Link></div>
                                    <div><Link to ="/register" className="mx-2 text-blue">Cadastre-se agora</Link></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
            <NotificationContainer />
        </BlockUi>
    );
}