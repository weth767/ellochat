import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import './styles.css';
import { MdAccountCircle, MdChat, MdMoreVert } from 'react-icons/md';
import { Link } from 'react-router-dom';

export default function UserInfo() {
    const userData = useSelector(state => state.user);
    const dispatch = useDispatch();

    function logout() {
        dispatch({
            type: 'LOGOUT',
        });
    }

    return (
        <div className="user-info">
            <div className="user-avatar">
                {userData.image ? 
                    <img src={userData.image} alt="imagem do usuário"/> :
                    <MdAccountCircle color="white" className="user-icon"/>
                }
                <span>{userData.username}</span>
            </div>
            <div className="setting-group">
                <button className="settings" type="button">
                    <MdChat color="white" className="settings-icon"/>
                </button>
                <div className="dropdown">
                    <button className="settings" type="button" id="dropdownMenuButton" data-bs-toggle="dropdown" aria-expanded="false">
                        <MdMoreVert color="white" className="settings-icon" />
                    </button>
                    
                    <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                        <li><Link to="/login" className="text-blue dropdown-item" onClick={() => logout()}>Sair</Link></li>
                    </ul>
                </div>
            </div>
        </div>
    );
}