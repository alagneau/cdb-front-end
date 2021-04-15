import React from 'react';
import PropTypes from 'prop-types';

import { Route } from 'react-router-dom';
import { HomeView } from '../Components/Views/Home/home.view';

export function RouteCDB({ component: Component, ...rest }) {
    const connected = localStorage.getItem("connected")
    return(
        <Route
        {...rest}
        render={() => (
            connected === "true" ?
                <Component {...rest}/>
            :
                <HomeView {...rest}/>
        )}
      />
    )
}

RouteCDB.propTypes = {
    path: PropTypes.string.isRequired,
    component: PropTypes.elementType.isRequired
}