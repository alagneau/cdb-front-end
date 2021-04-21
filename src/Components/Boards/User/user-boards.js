import { React, useState, useEffect } from 'react';
import './user-boards.scss';
import '../../../App.css';
import UserItems from '../../Items/User/user-items'

import List from "@material-ui/core/List";
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ConfirmationDialogRowAuthority from '../../Select/ConfirmationDialogRowAuthority/confirmationDialogRowAuthority'
import ConfirmationDialogRowEnabled from '../../Select/ConfirmationDialogRowEnabled/confirmationDialogRowEnabled'

import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import axios from 'axios';

function UserBoards() {


    const url = 'http://localhost:8080/webapp/APIUser';
    const [users, setUsers] = useState([]);
    const url_authorities = 'http://localhost:8080/webapp/APIAuthorities';
    const [authorities, setAuthorities] = useState([])

    const [open, setOpen] = useState(false);

    const [openListEnabled, setOpenListEnabled] = useState(false);
    const [openListAuthority, setOpenListAuthority] = useState(false);


    const [userToDB, setUserToDB] = useState(
        {
            username: "",
            enabled: 1,
            password: "excilys",
            authority: {
                id: 2,
                authority: "ROLE_USER"
            }
        }
    )

    const handleClickListItemEnabled = () => {
        setOpenListEnabled(true);
    };

    const handleCancelListItemEnabled = () => {
        setOpenListEnabled(false);
    };

    const handleClickListItemAuthority = () => {
        setOpenListAuthority(true);
    };

    const handleCancelListItemAuthority = () => {
        setOpenListAuthority(false);
    };

    // Quand tu cliques sur Créer un Utilisateur
    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
        resetUserToDB()
    };

    const resetUserToDB = () => {
        setUserToDB(
            {
                username: "",
                enabled: 1,
                password: "excilys",
                authority: {
                    id: 2,
                    authority: "ROLE_USER"
                }
            }
        )
    }

    const getApiList = () => {
        axios(
            {
                url: `${url}/list`,
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem("access_token")}`,
                }
            })
            .then(
                (result) => {
                    setUsers(result.data);
                }
            );
        console.log(users)
    }

    const getApiListAuthorities = () => {
        axios(
            {
                url: `${url_authorities}/list`,
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem("access_token")}`,
                }
            })
            .then(
                (result) => {
                    setAuthorities(result.data);
                }
            );
    }


    const deleteUser = async (user) => {
        await axios(
            {
                url: `${url}/delete?id=` + user.id,
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem("access_token")}`,
                }
            });
        getApiList();
    }

    const resetPassword = (user) => {
        axios(
            {
                url: `${url}/resetpassword`,
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem("access_token")}`,
                },
                data: JSON.stringify({
                    id: user.id,
                    username: user.username,
                    enabled: user.enabled,
                    authority: {
                        id: user.authority.id,
                        authority: user.authority.authority
                    }
                })
            });
        getApiList();
    }

    const updateUser = async (user) => {
        await axios(
            {
                url: `${url}/update`,
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem("access_token")}`,
                },
                data: JSON.stringify({
                    authority: {
                        authority: `${user.authority.authority}`,
                        id: `${user.authority.id}`
                    },
                    enabled: `${user.enabled}`,
                    id: `${user.id}`,
                    username: `${user.username}`
                })
            })
        getApiList();
    }

    const createUser = async () => {
        await axios(
            {
                url: `${url}/add`,
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem("access_token")}`,
                },
                data: JSON.stringify({
                    username: `${userToDB.username}`,
                    enabled: `${userToDB.enabled}`,
                    password: "excilys",
                    authority: {
                        id: `${userToDB.authority.id}`,
                        authority: `${userToDB.authority.authority}`
                    }
                })
            });
        getApiList();
        handleClose();
    }

    const usernameFormHandler = e => {
        setUserToDB({ ...userToDB, [e.target.name]: e.target.value })
    }

    const enabledFormHandler = newEnabled => {
        setUserToDB({ ...userToDB, enabled: newEnabled })
        console.log(userToDB)
        setOpenListEnabled(false);
    }

    const authorityFormHandler = e => {
        console.log(e)
        setUserToDB({ ...userToDB, authority: { id: e.id, authority: authorities[e.id - 1].authority } })
        setOpenListAuthority(false);
    }

    useEffect(() => {
        getApiList();
        getApiListAuthorities();
    }, [])

    return (
        <div>
            <div className="show-items">
                {users.map((elem) =>
                    <UserItems onUpdate={updateUser}
                        authorities={authorities} user={elem} onDelete={deleteUser} onResetPassword={resetPassword} key={elem.id} />)}
                <Button size="small" variant="outlined" color="primary" onClick={handleClickOpen}>
                    Créer un utilisateur
            </Button>
                <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
                    <DialogTitle>Formulaire de création utilisateur</DialogTitle>
                    <DialogContent>
                        <TextField
                            autoFocus
                            margin="dense"
                            id="username"
                            label="username"
                            name="username"
                            type="text"
                            onChange={usernameFormHandler}
                            fullWidth
                            error={userToDB.username === ""}
                            helperText={userToDB.username === "" ? 'Champ vide!' : ''}
                        />
                        <List key="enabledList">
                            <ListItem button divider onClick={handleClickListItemEnabled}>
                                <ListItemText primary="Enabled" secondary={userToDB.enabled} />
                            </ListItem>
                            <ConfirmationDialogRowEnabled
                                name="enabled"
                                keepMounted
                                open={openListEnabled}
                                onClose={handleCancelListItemEnabled}
                                onOk={enabledFormHandler}
                            />
                        </List>
                        <List key="authorityList">
                            <ListItem button divider onClick={handleClickListItemAuthority}>
                                <ListItemText primary="Authority" secondary={userToDB.authority.authority} />
                            </ListItem>
                            <ConfirmationDialogRowAuthority
                                name="authority"
                                keepMounted
                                open={openListAuthority}
                                onClose={handleCancelListItemAuthority}
                                onOk={authorityFormHandler}
                                authorities={authorities}
                            />
                        </List>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleClose} color="primary">
                            Annuler
                    </Button>
                        <Button disabled={!userToDB.username} onClick={createUser} color="primary">
                            Ajouter
                    </Button>
                    </DialogActions>
                </Dialog>
            </div>
        </div>
    );
}

export default UserBoards;