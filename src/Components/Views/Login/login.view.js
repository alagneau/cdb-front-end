import React, {useState} from 'react';
import clsx from 'clsx';
import { baseURL } from '../../../libs/context.js';

import { makeStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import InputLabel from '@material-ui/core/InputLabel';
import InputAdornment from '@material-ui/core/InputAdornment';
import FormControl from '@material-ui/core/FormControl';
import TextField from '@material-ui/core/TextField';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import { Button } from '@material-ui/core';
import axios from 'axios';
import {Redirect} from 'react-router-dom'

const useStyles = makeStyles((theme) => ({
    root: {
      display: 'flex',
      flexWrap: 'wrap',
    },
    margin: {
      margin: theme.spacing(1),
    },
    withoutLabel: {
      marginTop: theme.spacing(3),
    },
    textField: {
      width: '25ch',
    }
}))

export function LoginView(props) {
    const classes = useStyles()

    const [showPassword, setShowPassword] = useState(false)
    const [user, setUser] = useState({
        username: localStorage.getItem("username"),
        password: ""
    })

    const [connected, setConnected] = useState(localStorage.getItem("connected"))

    const handleChangeName = (event) => {
        setUser({...user, "username": event.target.value})
        localStorage.setItem("username", event.target.value)
    };
    const handleChangePassword = (event) => {
        setUser({...user, "password": event.target.value})
    };

    const handleConnected = (value) => {
        localStorage.setItem("connected", value)
        setConnected(value)
    };
  
    const handleClickShowPassword = () => {
        setShowPassword(!showPassword);
    };
  
    const handleMouseDownPassword = (event) => {
      event.preventDefault();
    };


    // useEffect(() => {
    //     // const requestOptions = {
    //     //     method: 'POST',
    //     //     headers: {
    //     //         'Authorization': 'Basic Y2xpZW50SWRQYXNzd29yZDpzZWNyZXQ=',
    //     //         'Access-Control-Allow-Origin': '*',
    //     //         'Content-Type': 'text/plain'
    //     //     }
    //     // };
    //     // const response = fetch('http://localhost:8080/webapp/oauth/token?username=admin&password=admin&grant_type=password&client_id=clientIdPassword', requestOptions);
    //     const requestOptions = {
    //         method: 'POST',
    //         data: {
    //             username: "admin",
    //             password: "admin"
    //         },
    //         headers: {
    //             // 'Authorization': 'Bearer e979ee87-da55-4e7f-af6e-0dce4245d47c',
    //             // 'Access-Control-Allow-Origin': '*',
    //             // 'Content-Type': 'application/json'
    //         }
    //     };
    //     const response = fetch('http://localhost:8080/webapp/login', requestOptions);
    //     const data = response;
    //     console.log(data);
    // })

    const handleSubmit = () => {
        axios.post(baseURL + "/login",
            {
                username: user.username,
                password: user.password
            })
            .then(response => {
                if (response.status === 200) {
                    handleConnected("true")
                }
            }).catch(error => {
                console.log(error)
            })
    }

    return(
        <div>
            <h2>Login page</h2>
            <div>
                <form onSubmit={() => handleSubmit()} action="">
                <div className={classes.root}>
                    <div>
                        <TextField
                            label="Username"
                            id="outlined-start-adornment"
                            className={clsx(classes.margin, classes.textField)}
                            variant="outlined"
                            onChange={e => handleChangeName(e)}
                            value={user.username}
                        />
                    </div>
                    <div>
                        <FormControl className={clsx(classes.margin, classes.textField)} variant="outlined">
                        <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
                        <OutlinedInput
                            id="outlined-adornment-password"
                            type={showPassword ? 'text' : 'password'}
                            onChange={e => handleChangePassword(e)}
                            value={user.password}
                            endAdornment={
                            <InputAdornment position="end">
                                <IconButton
                                aria-label="toggle password visibility"
                                onClick={handleClickShowPassword}
                                onMouseDown={handleMouseDownPassword}
                                edge="end"
                                >
                                {showPassword ? <Visibility /> : <VisibilityOff />}
                                </IconButton>
                            </InputAdornment>
                            }
                            labelWidth={70}
                        />
                        </FormControl>
                    </div>
                    <div>
                        <Button onClick={() => handleSubmit()}>Log In</Button>
                    </div>
                </div>
                </form>
            </div>
            {(connected==="true") && <Redirect to={props.path} {...props}/>}
        </div>
    )
}