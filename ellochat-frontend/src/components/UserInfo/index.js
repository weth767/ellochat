import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import './styles.css';
import { MdAccountCircle, MdChat, MdMoreVert } from 'react-icons/md';
import { Link } from 'react-router-dom';
import firebase from '../../config/firebase';

import PerfilInfo from '../PerfilInfo';
import AddContact from '../AddContact';
import ContactList from '../ContactList';

export default function UserInfo() {
    const userData = useSelector(state => state.user);
    const dispatch = useDispatch();

    function logout() {
        firebase.auth().signOut();
        dispatch({
            type: 'LOGOUT',
        });
    }

    return (
        <>
            <div className="user-info">
                <div className="user-avatar">
                    {userData.image ? 
                        <img src={userData.image} alt="imagem do usuário"/> :
                        <MdAccountCircle color="white" className="user-icon"/>
                    }
                    <span>{userData.username}</span>
                </div>
                <div className="setting-group">
                    <Link to="/" data-toggle="modal" data-target="#contactList" 
                                className="text-blue dropdown-item new-chat-icon">
                        <MdChat color="white" className="settings-icon"/>
                    </Link>
                    <div className="dropdown">
                        <button className="settings" type="button" id="dropdownMenuButton" data-bs-toggle="dropdown" aria-expanded="false">
                            <MdMoreVert color="white" className="settings-icon" />
                        </button>
                        
                        <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                            <li><Link to="/" data-toggle="modal" data-target="#perfilModal" 
                                className="text-blue dropdown-item">Perfil</Link></li>
                            <li><Link to="/" data-toggle="modal" data-target="#addContact" 
                                className="text-blue dropdown-item">Adicionar Contato</Link></li>
                            <li><Link to="/login" className="text-blue dropdown-item" onClick={() => logout()}>Sair</Link></li>
                        </ul>
                    </div>
                </div>
            </div>
            <PerfilInfo></PerfilInfo>
            <AddContact/>
            <ContactList/>
        </>
    );
}