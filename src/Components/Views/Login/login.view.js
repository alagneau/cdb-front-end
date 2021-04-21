import React, { useState } from 'react';
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
    page: {
        display: 'flex',
        "justify-content": "space-evenly",
        flexWrap: 'wrap',
        "align-items": "stretch",
        // "height": "100%"
    },
    root: {
        display: 'flex',
        // flexWrap: 'wrap',
        "flex-direction": "column",
        "align-items": "begin",
        "max-width": "240px"
    },
    item: {

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
    const [info_message, setInfoMessage] = useState(localStorage.getItem("login_message"))

    const handleChangeName = (event) => {
        setInfoMessage("")
        setUser({...user, "username": event.target.value})
        localStorage.setItem("username", event.target.value)
    };
    const handleChangePassword = (event) => {
        setInfoMessage("")
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

    const handleSubmit = () => {
        localStorage.setItem("login_message", "")
        axios.post(baseURL + "/login/Oauth",
            {
                username: user.username,
                password: user.password
            })
            .then(response => {
                if (response.status === 200) {
                    setUser({...user, "password": ""})
                    localStorage.setItem("access_token", response.data.access_token)
                    localStorage.setItem("refresh_token", response.data.refresh_token)
                    localStorage.setItem("user_role", response.data.role)
                    handleConnected("true")
                }
            }).catch(error => {
                setInfoMessage("Mauvaise combinaison username / password")
            })
    }

    return(
        <div className={classes.page}>
            <div>
                <form onSubmit={() => handleSubmit()} action="">
                <div className={classes.root}>
                    <h2>Login page</h2>
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
                    <span>{info_message}</span>
                    <div>
                        <Button onClick={() => handleSubmit()}>Log In</Button>
                    </div>
                </div>
                </form>
            </div>

            <div>
                <img style={{width: "600px"}} src="login_image.png" alt="Exemple d'une page du site"/>
            </div>
            {(connected==="true") && <Redirect to={props.path} {...props}/>}
        </div>
    )
}
