import React, {useState, useEffect} from 'react';
import clsx from 'clsx';
import { baseURL } from '../../Models/auth';

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

    const [user_params, setUserParams] = useState({
      username: '',
      password: '',
      showPassword: false
    });
  
    const handleChange = (prop) => (event) => {
        setUserParams({ ...user_params, [prop]: event.target.value });
    };
  
    const handleClickShowPassword = () => {
        setUserParams({ ...user_params, showPassword: !user_params.showPassword });
    };
  
    const handleMouseDownPassword = (event) => {
      event.preventDefault();
    };

    useEffect(() => {
        // fetch(baseURL + "/login", {
        //     'auth': {
        //         user: "admin",
        //         pass: "admin"
        //     },
        // }).then(response => {
        //     console.log(response)
        // }).catch(error => console.log(error))
    })

    // let bodyFormData = new FormData()
    // bodyFormData.append("username", "admin")
    // bodyFormData.append("password", "admin")
    // bodyFormData.append("grant_type", "password")
    // bodyFormData.append("client_id", "clientIdPassword")

    // const handleSubmit = function() {
    //     console.log("LOGGING IN");
    //     // axiosInstance.post('/oauth/token', {
    //     //     username: user_params.username,
    //     //     password: user_params.password,
    //     //     grant_type: "password",
    //     //     client_id: "clientIdPassword"
    //     // }).then(response => {
    //     //     console.log(response);
    //     // }).catch(err => {
    //     //     alert(err)
    //     // })
    //     axios({
    //         method: "get",
    //         url: baseURL + "/APIComputer/count",
            
    //             params: {
    //                 "username": "admin",
    //                 "password": "admin",
    //                 "grant_type": "password",
    //                 "client_id": "clientIdPassword"
    //             }
    //         ,auth: {
    //             username: "admin",
    //             password: "admin"
    //         }
            
    //             // headers: {
    //             //     "Access-Control-Allow-Origin": "test",
    //             //     Authorization: "Basic Y2xpZW50SWRQYXNzd"
    //             // }
    //     })
    //     .then(response => {console.log(response)})
    //     .catch(err => {console.log(err)})
    // };

    const handleSubmit = () => {
        axios.post(baseURL + "/oauth/token",
            {
                params: {
                    "username": "admin",
                    "password": "admin",
                    "grant_type": "password",
                    "client_id": "clientIdPassword"
                },
                auth: {
                    user: "clientIdPassword",
                    pass: "secret"
                }
        // axios.get(baseURL + "/APIComputer/count", {
        //         headers: {
        //             'Authorization': "Bearer 2ec03420-51fe-4af4-8f0f-651fb0cc88ee"
        //         }
            }).then(function(response) {
                console.log(response)
                console.log('Authenticated');
            }).catch(function(error) {
                console.log(error)
                console.log('Error on Authentication');
            });
    }

    return(
        <div>
            <h2>Login page</h2>
            <div>
                <div>
                    <h3>Example</h3>
                </div>
                <form onSubmit={() => handleSubmit()} action="">
                <div className={classes.root}>
                    <div>
                        <TextField
                            label="Username"
                            id="outlined-start-adornment"
                            className={clsx(classes.margin, classes.textField)}
                            variant="outlined"
                            onChange={handleChange('username')}
                        />
                    </div>
                    <div>
                        <FormControl className={clsx(classes.margin, classes.textField)} variant="outlined">
                        <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
                        <OutlinedInput
                            id="outlined-adornment-password"
                            type={user_params.showPassword ? 'text' : 'password'}
                            value={user_params.password}
                            onChange={handleChange('password')}
                            endAdornment={
                            <InputAdornment position="end">
                                <IconButton
                                aria-label="toggle password visibility"
                                onClick={handleClickShowPassword}
                                onMouseDown={handleMouseDownPassword}
                                edge="end"
                                >
                                {user_params.showPassword ? <Visibility /> : <VisibilityOff />}
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
        </div>
    )
}