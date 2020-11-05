import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Login from 'views/login';
import Register from 'views/register';
import HomeModule from 'views/home';
import ProviderModule from 'views/provider'
import DocumentEntryModule from 'views/DocumentEntry'


const Router = () => {
    return (
        <Switch>
            <Route path="/" exact component={HomeModule} />
            <Route path="/providers" component={ProviderModule} />
            <Route path="/documentEntryModule" component={DocumentEntryModule} />
            <Route path="/login" component={Login} />
            <Route path="/register" component={Register} />
        </Switch>
    )
};

export default Router;