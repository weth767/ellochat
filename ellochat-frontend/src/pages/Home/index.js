import React from 'react';
import './styles.css';
import UserInfo from '../../components/UserInfo';
import ChatComponent from '../../components/ChatComponent';
import ContactGroupList from '../../components/ContactGroupList';

export default function Home() {
    return (
        <div class="homegrid">
           <UserInfo/>
           <ChatComponent/>
           <ContactGroupList/>
        </div>
    );
}