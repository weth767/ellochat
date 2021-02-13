import React from 'react';
import './styles.css';
import ContactInfo from '../ContactInfo';

export default function ContactGroupList(props) {
    return (
        <div className="contact-group-list">
            <div className="contact-group-list-separator"></div>
            <ContactInfo contactName="Johnson" lastMessage="Alou"/>
            <ContactInfo contactName="Johnson" lastMessage="Alou"/>
            <ContactInfo contactName="Johnson" lastMessage="Alou"/>
            <ContactInfo contactName="Zezinho" lastMessage="Alou"/>
            <ContactInfo contactName="Zezinho" lastMessage="Alou"/>
            <ContactInfo contactName="Zezinho" lastMessage="Alou"/>
            <ContactInfo contactName="Zezinho" lastMessage="Alou"/>
            <ContactInfo contactName="Zezinho" lastMessage="Alou"/>
            <ContactInfo contactName="Zezinho" lastMessage="Alou"/>
            <ContactInfo contactName="Zezinho" lastMessage="Alou"/>
            <ContactInfo contactName="Zezinho" lastMessage="Alou"/>
            <ContactInfo contactName="Zezinho" lastMessage="Alou"/>
            <ContactInfo contactName="Zezinho" lastMessage="Alou"/>
        </div>
    )
}