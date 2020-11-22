import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Login from 'views/login';
import Register from 'views/register';
import HomeModule from 'views/home';
import ProviderModule from 'views/provider'
import DocumentEntryModule from 'views/documentEntry'
import Accounting from 'views/accounting'
import PrivateRoute from './PrivateRouteWrapper';

const Router = () => {
    return (
        <Switch>
            <PrivateRoute path="/" exact component={HomeModule} />
            <PrivateRoute path="/providers" component={ProviderModule} />
            <PrivateRoute path="/documentEntryModule" component={DocumentEntryModule} />
            <PrivateRoute path="/accounting" component={Accounting} />
            <Route path="/login" component={Login} />
            <Route path="/register" component={Register} />
        </Switch>
    )
};

export default Router;