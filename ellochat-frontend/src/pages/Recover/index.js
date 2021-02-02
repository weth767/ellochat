import React,{useState} from 'react';
import { Link, Redirect} from 'react-router-dom';
import {useSelector, useDispatch} from 'react-redux';
import 'firebase/auth'
import BlockUi from "react-block-ui";
import "react-block-ui/style.css";
import "react-notifications/lib/notifications.css";
import {
  NotificationContainer,
  NotificationManager,
} from "react-notifications";

import Logo from "../../assets/ellochat-banner.png";
import firebase from '../../config/firebase'
import './styles.css';



export default function Recover() {

    const [email, setEmail] = useState('');

    const [blocking, setBlocking] = useState(false);

    
    function handleRecover() {
        console.log(email);
        setBlocking(true);
        firebase.auth()
        .sendPasswordResetEmail(email)
        .then(() => {
            NotificationManager.success('Link Enviado para o E-mail!', 'Sucesso',1000);
        }).catch((error) => {
            console.log(error);
            NotificationManager.warning('Verifique se o E-mail digitado é válido!', 'Erro',1000);
        }).finally(() => {
            setBlocking(false);
        });
        
    }

    return (
        <BlockUi tag="div" blocking={blocking}>
            <div className="recover-content text-center">
                <form className="mx-auto col-sm-12 col-md-8 col-lg-5">
                    <img src={Logo} className="recover-logo" alt=""></img>
                    <div className="card">
                        <div className="row">
                            <div className="col-md-12 d-flex align-items-center flex-column">    
                                <h3 className="h3 mb-3 font-weight-bold text-blue"> Recuperar Senha </h3>
                                <div className="col-12 col-md-10 ">
                                    <input type="email" className="form-control recover-input text-blue" id="inputEmail" aria-describedby="emailHelp" placeholder="E-mail" 
                                    onChange={e => setEmail(e.target.value)} />
                                </div>
                                <div className="col-12 col-md-10 ">
                                    <button type="button" className="btn btn-lg btn-recover btn-block" onClick={handleRecover} >Recuperar Senha</button>
                                </div>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-md-12 d-flex align-items-center flex-column">    
                                <div className="col-md-10 d-flex justify-content-center">
                                    <div><Link to ="/" className="mx-2 text-blue">Efetuar login</Link></div>
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