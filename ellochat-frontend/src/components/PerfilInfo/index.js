import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import InputMask from "react-input-mask";
import BlockUi from "react-block-ui";
import { NotificationManager,NotificationContainer } from "react-notifications";

import firebase from "../../config/firebase";
import Messages from '../../constants/messages';
import './styles.css';

export default function PerfilInfo() {

    const [username, setUsername] = useState('');
    const [nickname, setNickname] = useState('');
    const [phone, setPhone] = useState('');
    const [status, setStatus] = useState('');
    const [email, setEmail] = useState('');
    const [picture, setPicture] = useState();
    const [blocking, setBlocking] = useState(false);
    const userData = useSelector(state => state.user);
    const dispatch = useDispatch();

    const database = firebase.database();
    const storage = firebase.storage();

    useEffect(() => {
        setBlocking(true);
        database.ref(`users/${userData.userHash}`)
        .on('value', snapshot => {
            if(snapshot.val()){
                setUsername(snapshot.val().username);
                setNickname(snapshot.val().nickname);
                setPhone(snapshot.val().phone);
                setStatus(snapshot.val().status);
                setEmail(snapshot.val().email);
                setBlocking(false);
            }
        });
    }, []);

    function save(){
        if(picture){
            return saveUserImage();
        }
        return saveUser();
    }

    function saveUser(){
        database.ref(`users/${userData.uid}`).set({
            username: username,
            nickname: nickname,
            email: email,
            phone: phone,
            status: status
        }).then(() => {
            dispatch({
                type: 'LOGIN',
                payload: {
                    userEmail: email,
                    username: nickname === "" ? username : nickname,
                }
            });
            firebase.storage().ref(`users-pictures/${userData.userEmail}`).getDownloadURL()
            .then(image => {
                dispatch({
                    type: 'IMAGE',
                    payload: {
                        image:image
                    }
                });
            });
            
            NotificationManager.success(
            "Perfil alterado com sucesso", "Sucesso!",
            1000, () => { });
        }, (error) => {
            NotificationManager.error(
              Messages.getBrazilianPortgueseMessageRegister(error.code), "Erro",
              1000, () => { }
            );
        });
    }

    function saveUserImage(){
        setBlocking(true);
        storage.ref(`users-pictures/${email}`)
            .put(picture)
            .then( () => {
                saveUser();
            })
            .catch( () => {
            }).finally(() => {
                setBlocking(false);
            });

    }

    return (
        
        <div className="modal" id="perfilModal" tabIndex="-1" role="dialog" aria-labelledby="perfilModalTitle" aria-hidden="true">
            <div className="modal-dialog modal-dialog-centered modal-lg" role="document">
                <BlockUi tag="div"  className="modal-content" blocking={blocking}>
                    <div className="modal-header">
                        <h3 className="h3 mb-3 font-weight-bold text-blue"> Meu Perfil </h3>
                        <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div className="modal-body">
                        <div className="row">
                            <div className="col-12 col-md-6">
                                <label htmlFor="inputNome">Nome</label>
                                <input type="text" className="form-control text-blue" id="inputNome" placeholder="Nome"
                                    onChange={(event) => setUsername(event.target.value)} value={username}/>
                            </div>
                            <div className="col-12 col-md-6">
                                <label htmlFor="inputPicture">Foto</label>
                                <input type="file" id="inputPicture" className="form-control-file"
                                    onChange={(e) => setPicture(e.target.files[0])}/>
                            </div>
                            
                        </div>
                        <div className="row mt-3">
                            <div className="col-12 col-md-4">
                                <label htmlFor="inputEmail">E-mail</label>
                                <input type="text" className="form-control text-blue" id="inputEmail" placeholder="E-mail"
                                    onChange={(event) => setEmail(event.target.value)} value={email}/>
                            </div>
                            <div className="col-12 col-md-4">
                                <label htmlFor="inputApelido">Apelido</label>
                                <input type="text" className="form-control text-blue" id="inputApelido" placeholder="Apelido"
                                    onChange={(event) => setNickname(event.target.value)} value={nickname}/>
                            </div>
                            
                            <div className="col-12 col-md-4">
                                <label htmlFor="phone">Telefone</label>
                                <InputMask mask="(99) 99999-9999" id="phone" className="form-control"
                                    placeholder=""
                                    onChange={(event) => setPhone(event.target.value)}
                                    value={phone}
                                />
                            </div>
                        </div>
                        <div className="row mt-3">
                            <div className="col-12">
                                <label htmlFor="inputStatus">Status</label>
                                <textarea className="form-control w-100" id="inputStatus" rows="3"
                                    onChange={(event) => setStatus(event.target.value)} value={status}>
                                </textarea>
                            </div>
                        </div>
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-secondary" data-dismiss="modal">Fechar</button>
                        <button type="button" className="btn btn-primary" onClick={save}>Salvar informações</button>
                    </div>
                </BlockUi>                        
            </div>
            <NotificationContainer />
        </div>
    );
}