import React from 'react';
import { Redirect } from 'react-router';

export function Logout() {
    localStorage.setItem("connected", "")

    return (
        <Redirect to="/home"/>
    )
}