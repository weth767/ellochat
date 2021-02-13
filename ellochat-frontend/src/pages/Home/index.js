import React from 'react';
import './styles.css';
import UserInfo from '../../components/UserInfo';
import BannerComponent from '../../components/BannerComponent';
import ContactGroupList from '../../components/ContactGroupList';
import { useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';

export default function Home() {

    return (
        <>
            {useSelector(state => state.user.userLogged) === false ? <Redirect to="/login"></Redirect> : null}
            <div className="homegrid">
                
            <UserInfo/>
            <BannerComponent/>
            <ContactGroupList/>
            </div>
        </>
    );
}