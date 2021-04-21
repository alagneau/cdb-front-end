import axios from 'axios';
import React, { useState } from 'react';
import { baseURL } from '../../../libs/context';

export function HomeView(props) {
    const [count, setCount] = useState(0)

    const handleComputers = (event) => {
        axios({
            url: baseURL + "/APIComputer/count", 
            headers: {
                Authorization: "Bearer " + localStorage.getItem("access_token")
            }
        })
        .then(response => {
            setCount(response.data)
        })
    }
    const handleCompanies = (event) => {
        axios({
            url: baseURL + "/APICompany/count", 
            headers: {
                Authorization: "Bearer " + localStorage.getItem("access_token")
            }
        })
        .then(response => {
            setCount(response.data)
        })
    }

    return(
        <div>
            <h2>Home page</h2>
            <div>
                <p>Vous êtes connectés ({localStorage.getItem("username")} {localStorage.getItem("user_role")}) ! Super !</p>
            </div>
            <p>{count}</p>
            <button onClick={handleCompanies}>Companies</button>
            <button onClick={handleComputers}>Computers</button>
        </div>
    )
}