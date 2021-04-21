import React from 'react';
import { Redirect } from 'react-router';

export function Logout() {
    localStorage.setItem("access_token", "")
    localStorage.setItem("refresh_token", "")
    localStorage.setItem("user_role", "")
    localStorage.setItem("login_message", "Déconnexion réussie")
    localStorage.setItem("connected", "")

    return (
        <Redirect to="/home"/>
    )
}