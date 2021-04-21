import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { baseURL } from '../../../libs/context';

export function HomeView(props) {
    const [count, setCount] = useState(0)
    const [name, setName] = useState("")
    useEffect(() => {
        handleComputers()
    }, [])

    const handleComputers = () => {
        axios({
            url: baseURL + "/APIComputer/count", 
            headers: {
                Authorization: "Bearer " + localStorage.getItem("access_token")
            }
        })
        .then(response => {
            setCount(response.data)
            setName("computers")
        })
    }
    const handleCompanies = () => {
        axios({
            url: baseURL + "/APICompany/count", 
            headers: {
                Authorization: "Bearer " + localStorage.getItem("access_token")
            }
        })
        .then(response => {
            setCount(response.data)
            setName("companies")
        })
    }

    return(
        <div>
            <div>
                <p>Hello {localStorage.getItem("username")} !</p>
                <p>You are connected on CDB.</p>
            </div>
            <p>Count of {name} : {count}</p>
            <button onClick={handleCompanies}>Companies</button>
            <button onClick={handleComputers}>Computers</button>
        </div>
    )
}