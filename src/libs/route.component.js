import React from 'react';
import PropTypes from 'prop-types';

import { Route } from 'react-router-dom';
import { LoginView } from '../Components/Views/Login/login.view';

export function RouteCDB({ component: Component, ...rest }) {
    const connected = localStorage.getItem("connected")
    return(
        <Route
        {...rest}
        render={() => (
            connected === "true" ?
                <Component {...rest}/>
            :
                <LoginView {...rest}/>
        )}
      />
    )
}

RouteCDB.propTypes = {
    path: PropTypes.string.isRequired,
    component: PropTypes.elementType.isRequired
}