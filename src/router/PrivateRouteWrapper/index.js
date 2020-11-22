import React from 'react'
import { Redirect, Route } from 'react-router-dom'
import { connect } from 'react-redux';

const PrivateRoute = ({ component: Component, ...rest }) => {
    return (
        <Route
            {...rest}
            component={ props =>
                rest.isLoggedIn 
                ? <Component {...props} />
                : <Redirect to='login' />
            }
        />
    )
}

const mapStateToProps = (state) => {
    return {
        isLoggedIn: state.isLoggedIn
    }
}

export default connect(mapStateToProps)(PrivateRoute);
