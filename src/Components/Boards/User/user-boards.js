import { React, useState, useEffect } from 'react';
import './user-boards.scss';
import '../../../App.css';
import UserItems from '../../Items/User/user-items'

import List from "@material-ui/core/List";
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ConfirmationDialogRowAuthority from '../../Select/ConfirmationDialogRowAuthority/confirmationDialogRowAuthority'
import ConfirmationDialogRowEnabled from '../../Select/ConfirmationDialogRowEnabled/confirmationDialogRowEnabled'

import Search from '../../Input/Search/search'

import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';

function UserBoards() {

    const token = localStorage.getItem("access_token");

    const url = 'http://localhost:8080/webapp/APIUser';
    const [users, setUsers] = useState([]);
    const url_authorities = 'http://localhost:8080/webapp/APIAuthorities';
    const [authorities, setAuthorities] = useState([])

    const [error, setError] = useState(null);

    const [searchValue, setSearchValue] = useState('');
    const [edit, setEdit] = useState(false);
    const [open, setOpen] = useState(false);

    const [openListEnabled, setOpenListEnabled] = useState(false);
    const [openListAuthority, setOpenListAuthority] = useState(false);


    const [userToDB, setUserToDB] = useState(
        {
            username: "",
            enabled: Number,
            password: "excilys",
            authority: {
                id: Number,
                authority: ""
            }
        }
    )
    const [authorityToDB, setAuthorityToDB] = useState(
        {
            id: 0,
            authority: ""
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
                enabled: Number,
                password: "excilys",
                authority: {
                    id: Number,
                    authority: ""
                }
            }
        )
    }

    const getApiList = () => {
        fetch(`${url}/list`,
            {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${token}`,
                }
            })
            .then(data => data.json())
            .then(
                (result) => {
                    console.log(result)
                    setUsers(result);
                },
                (error) => {
                    setError(error);
                }
            );
        console.log(users)
    }

    const getApiListAuthorities = () => {
        fetch(`${url_authorities}/list`,
            {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${token}`,
                }
            })
            .then(data => data.json())
            .then(
                (result) => {
                    setAuthorities(result);
                },
                (error) => {
                    setError(error);
                }
            );
        console.log(authorities)
    }


    const deleteUser = async (user) => {
        await fetch(`${url}/delete?id=` + user.id, {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${token}`,
            }
        });
        getApiList();
    }

    const resetPassword = async (user) => {
        console.log(
            await fetch(`${url}/resetpassword`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
                body: JSON.stringify({
                    id: user.id,
                    username: user.username,
                    enabled: user.enabled,
                    authority: {
                        id: user.authority.id,
                        authority: user.authority.authority
                    }
                })
            }));
        getApiList();
    }

    const updateUser = async (user) => {
        await fetch(`${url}/update`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
            body: JSON.stringify({
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

    const createUser = async (user) => {
        await fetch(`${url}/add`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
            body: JSON.stringify(userToDB)
        });
        getApiList();
        resetUserToDB()
    }

    const usernameFormHandler = e => {
        setUserToDB({ ...userToDB, [e.target.name]: e.target.value })
    }

    const enabledFormHandler = newEnabled => {
        setUserToDB({ ...userToDB, enabled: newEnabled })
        setOpenListEnabled(false);
    }

    const authorityFormHandler = e => {
        let temp = { ...authorityToDB }
        temp.id = parseInt(e.target.value)
        temp.authority = authorities[temp.id - 1].authority
        setAuthorityToDB(temp)
        setUserToDB({ ...userToDB, authority: authorityToDB })
        setOpenListAuthority(false);
    }

    useEffect(() => {
        getApiList();
        getApiListAuthorities();
    }, [])


    function filterList() {
        if (searchValue == "") {
            return users;
        }
        return users.filter((elem) => elem.username.includes(searchValue));
    }

    function onSearch(value) {
        setSearchValue(value)
    }

    return (
        <div>
            <Search searchValue={searchValue} useSearch={onSearch} />
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
                                value={userToDB.enabled}
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
                                onChange={authorityFormHandler}
                                value={userToDB.authority.authority}
                                authorities={authorities}
                            />
                        </List>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleClose} color="primary">
                            Annuler
                    </Button>
                        <Button onClick={createUser} color="primary">
                            Ajouter
                    </Button>
                    </DialogActions>
                </Dialog>
            </div>
        </div>
    );
}

export default UserBoards;