import React from 'react';
import {BrowserRouter, Route, Switch} from 'react-router-dom';

export default function Routes() {
    return (
        <BrowserRouter>
            <Switch>
                <Route path="/" exact component={}/>
                <Route path="/login" component={}/>
                <Route path="/register" component={}/>
                <Route path="/profile" component={}/>
                <Route path="/chat/:id" component={}/>
                <Route path="/chat/new" component={}/>
                <Route path="/group/:id" component={}/>
                <Route path="/group/new" component={}/>
            </Switch>
        </BrowserRouter>
    )
}