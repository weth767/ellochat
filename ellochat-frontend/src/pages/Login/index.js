import React,{useState} from 'react';
import { Link, Redirect} from 'react-router-dom';
import {useSelector, useDispatch} from 'react-redux';
import 'firebase/auth'

import Logo from '../../assets/ellochat-logo.svg';
import firebase from '../../config/firebase'
import './styles.css';



export default function Login() {

    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');

    const dispatch = useDispatch();
    
    function handleLogin() {

        firebase.auth()
        .signInWithEmailAndPassword(email,senha)
        .then(resultado => {
            console.log("Logado");
            dispatch({
                type:'LOG_IN',
                payload:{
                    usuarioEmail:email
                }
            })
            
        }).catch(erro => {
            console.log("Erro ao logar");
        });
    }

    return (
        <div className="login-content d-flex align-items-top text-center">
            <form className="mx-auto col-sm-12 col-md-8 col-lg-5">
                <img src={Logo}  width="400" height="400" alt=""></img>
                <div className="card">
                    <div className="row">
                        <div className="col-md-12 d-flex align-items-center flex-column">    
                            <h3 className="h3 mb-3 font-weight-bold text-blue"> Conectar-se </h3>
                            <div className="mb-3 col-md-10 ">
                                <input type="email" className="form-control text-blue" id="inputEmail" aria-describedby="emailHelp" placeholder="E-mail" 
                                   onChange={e => setEmail(e.target.value)} />
                            </div>
                            <div className="mb-3 col-md-10 ">
                                <input type="password" className="form-control text-blue" id="inputPassowrd" placeholder="Senha"
                                    onChange={e => setSenha(e.target.value)}/>
                            </div>
                            <div className="mb-3 col-md-10 ">
                                <button type="button" className="btn btn-lg btn-login btn-block" onClick={handleLogin} >Entrar</button>
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-12 d-flex align-items-center flex-column">    
                            <div className="col-md-10 d-flex justify-content-between">
                                <div><Link to ="#" className="mx-2 text-blue">Esqueci minha senha</Link></div>
                                <div><Link to ="#" className="mx-2 text-blue">Cadastre-se agora</Link></div>
                            </div>
                        </div>
                    </div>
                </div>
                
                
            </form>
            
        </div>
    );
}