import React from 'react';
import './styles.css';
import ContactInfo from '../ContactInfo';

export default function ContactGroupList(props) {
    return (
        <div className="contact-group-list">
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