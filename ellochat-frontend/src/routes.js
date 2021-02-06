import React from 'react';
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import RecoverPassword from './pages/RecoverPassword';
import Home from './pages/Home';

export default function Routes() {
    return (
        <BrowserRouter>
            <Switch>
                <Route path="/" exact component={Home}/>
                <Route path="/login" component={Login}/>
                <Route path="/register" component={Register}/>
                <Route path="/recoverypass" component={RecoverPassword}/>
                {/* <Route path="/profile" component={}/>
                <Route path="/chat/:id" component={}/>
                <Route path="/chat/new" component={}/>
                <Route path="/group/:id" component={}/>
                <Route path="/group/new" component={}/> */}
            </Switch>
        </BrowserRouter>
    )
}