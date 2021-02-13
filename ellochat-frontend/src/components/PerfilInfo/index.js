import React, { useState, useEffect } from 'react';
import InputMask from "react-input-mask";
import './styles.css';
import firebase from "../../config/firebase";

export default function PerfilInfo() {

    const [username, setUsername] = useState('');
    const [nickname, setNickname] = useState('');
    const [phone, setPhone] = useState('');
    const [status, setStatus] = useState('');
    const [email, setEmail] = useState('');

    const database = firebase.database();

    useEffect(() => {
        
    });

    return (
        <div className="modal" id="perfilModal" tabIndex="-1" role="dialog" aria-labelledby="perfilModalTitle" aria-hidden="true">
            <div className="modal-dialog modal-dialog-centered modal-lg" role="document">
                <div className="modal-content">
                    <div className="modal-header">
                        <h3 className="h3 mb-3 font-weight-bold text-blue"> Meu Perfil </h3>
                        <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div className="modal-body">
                        <div className="row">
                            <div className="col-12 col-md-6">
                                <label for="inputNome">Nome</label>
                                <input type="text" className="form-control text-blue" id="inputNome" placeholder="Nome"
                                    onChange={(event) => setUsername(event.target.value)}/>
                            </div>
                            <div className="col-12 col-md-6">
                                <label for="inputEmail">E-mail</label>
                                <input type="text" className="form-control text-blue" id="inputEmail" placeholder="E-mail"
                                    onChange={(event) => setEmail(event.target.value)}/>
                            </div>
                        </div>
                        <div className="row mt-3">
                            <div className="col-12 col-md-4">
                                <label for="inputApelido">Apelido</label>
                                <input type="text" className="form-control text-blue" id="inputApelido" placeholder="Apelido"
                                    onChange={(event) => setNickname(event.target.value)}/>
                            </div>
                            
                            <div className="col-12 col-md-4">
                                <label for="inputEmail">Telefone</label>
                                <InputMask mask="(99) 99999-9999" id="phone" className="form-control"
                                    placeholder=""
                                    onChange={(event) => setPhone(event.target.value)}
                                />
                            </div>
                            <div className="col-12 col-md-4">
                                <label for="inputEmail">Foto</label>
                                <input type="text" className="form-control text-blue" id="inputEmail" placeholder="Foto"
                                    />
                            </div>
                        </div>
                        <div className="row mt-3">
                            <div className="col-12">
                                <label for="inputStatus">Status</label>
                                <textarea class="form-control w-100" id="inputStatus" rows="3"
                                    onChange={(event) => setStatus(event.target.value)}>
                                </textarea>
                            </div>
                        </div>
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-secondary" data-dismiss="modal">Fechar</button>
                        <button type="button" className="btn btn-primary">Salvar informações</button>
                    </div>
                </div>
            </div>
      </div>
    );
}