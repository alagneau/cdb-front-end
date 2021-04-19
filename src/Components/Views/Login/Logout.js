import React from 'react';
import { Redirect } from 'react-router';

export function Logout() {
    localStorage.setItem("connected", "")
    localStorage.setItem("access_token", "")
    localStorage.setItem("refresh_token", "")
    localStorage.setItem("login_message", "Déconnexion réussie")

    return (
        <Redirect to="/home"/>
    )
}