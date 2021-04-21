import './App.css';
import { BrowserRouter, Switch } from 'react-router-dom'
import { HomeView } from './Components/Views/Home/home.view';
import { RouteCDB } from './libs/route.component';
import { Logout } from './Components/Views/Login/Logout';
import { baseURL } from './libs/context';
import axios from 'axios';
import { useEffect, useState } from 'react';
import AppBar from './Components/Header/App-Bar/appBar'
import UserView from './Components/Views/User/user-view';

function App() {
    useEffect(() => {
        axios.interceptors.response.use(response => {
            return response;
        }, err => {
            return new Promise((resolve, reject) => {
                const originalReq = err.config;
                if (err.response.status === 401 && err.config && !err.config.__isRetryRequest) {
                    originalReq._retry = true;

                    let res = fetch(baseURL + "/login/Oauth/refresh", {
                        method: 'POST',
                        headers: {
                            "Content-Type": "application/json"
                        },
                        body: JSON.stringify({
                            token: localStorage.getItem("refresh_token"),
                        }),
                    }).then(res => res.json()).then(res => {
                        localStorage.setItem("access_token", res.access_token)
                        localStorage.setItem("refresh_token", res.refresh_token)

                        originalReq.headers['Authorization'] = "Bearer " + res.access_token;
                        return axios(originalReq);
                    });

                    resolve(res);
                }
                return reject(err);
            });
        });
    }, [])
    const [draw, setDraw] = useState(localStorage.getItem("connected")==="true")
    const handleHeader = () => {
        setDraw(localStorage.getItem("connected")==="true")
    }

    return (
        <BrowserRouter>
            <div className="App">
                {draw && <AppBar />}
                <Switch>
                    <RouteCDB exact path="/" component={HomeView} update={handleHeader}/>
                    <RouteCDB exact path="/computer" component={HomeView} update={handleHeader}/>
                    <RouteCDB exact path="/company" component={HomeView} update={handleHeader}/>
                    <RouteCDB exact path="/user" component={UserView} update={handleHeader}/>
                    <RouteCDB exact path="/logout" component={Logout} update={handleHeader}/>
                    <RouteCDB path="/" component={HomeView} update={handleHeader}/>
                </Switch>
            </div>
        </BrowserRouter>
    );
}

export default App;
