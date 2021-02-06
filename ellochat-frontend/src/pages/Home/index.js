import React from 'react';
import './styles.css';
import { useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';

export default function Home() {
    return (
        <>
        {useSelector(state => state.user.userLogged) === false ? <Redirect to="/login"></Redirect> : null}
            <div>
                <h1>Home</h1>
            </div>
        </>
    );
}