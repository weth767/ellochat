import React from 'react';
import { useSelector } from 'react-redux';
import './styles.css';
import { MdAccountCircle, MdChat, MdMoreVert } from 'react-icons/md';

export default function UserInfo() {
    const userData = useSelector(state => state.user);
    return (
        <div className="user-info">
            <div className="user-avatar">
                {userData.image ? 
                    <img src={userData.image} alt="imagem do usuário"/> :
                    <MdAccountCircle color="white" className="user-icon"/>
                }
                <span>{userData.username}</span>
            </div>
            <div>
                <button className="settings" type="button">
                    <MdChat color="white" className="settings-icon"/>
                </button>
                <button className="settings" type="button">
                    <MdMoreVert color="white" className="settings-icon"/>
                </button>
            </div>
        </div>
    );
}