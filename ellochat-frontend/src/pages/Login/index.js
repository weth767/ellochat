import React from 'react';
import Logo from '../../assets/ellochat-logo.svg';
import './styles.css';
import { Link, Redirect} from 'react-router-dom';

export default function Login() {
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
                                    />
                            </div>
                            <div className="mb-3 col-md-10 ">
                                <input type="password" className="form-control text-blue" id="inputPassowrd" placeholder="Senha"
                                    />
                            </div>
                            <div className="mb-3 col-md-10 ">
                                <button type="button" className="btn btn-lg btn-login btn-block" >Entrar</button>
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