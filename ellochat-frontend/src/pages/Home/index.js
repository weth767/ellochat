import React, { useState } from 'react';
import './styles.css';
import UserInfo from '../../components/UserInfo';
import BannerComponent from '../../components/BannerComponent';
import ContactGroupList from '../../components/ContactGroupList';
import { useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';

export default function Home() {
    const [contact, setContact] = useState(undefined);
    const [isNewChat, setIsNewChat] = useState(true);

    const handleNewChat = (cont) => {
        setIsNewChat(cont !== contact);
        setContact(cont);
    }
    
    return (
        <>
            {useSelector(state => state.user.userLogged) === false ? <Redirect to="/login"></Redirect> : null}
            <div className="homegrid">
            <UserInfo newChatCallback={handleNewChat}/>
            <BannerComponent contact={contact} isNewChat={isNewChat}/>
            <ContactGroupList/>
            </div>
        </>
    );
}