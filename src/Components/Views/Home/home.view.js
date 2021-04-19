import React from 'react';

export function HomeView(props) {

    return(
        <div>
            <h2>Home page</h2>
            <div>
                <p>Vous êtes connectés ({localStorage.getItem("username")} {localStorage.getItem("access_token")}) ! Super !</p>
            </div>
        </div>
    )
}