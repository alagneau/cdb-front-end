import { React, useState } from 'react';
import '../../../App.css';

import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Input from '@material-ui/core/Input';

import List from "@material-ui/core/List";
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ConfirmationEditDialogRowAuthority from '../../Select/ConfirmationDialogRowAuthority/confirmationEditDialogRowAuthority'
import ConfirmationEditDialogRowEnabled from '../../Select/ConfirmationDialogRowEnabled/confirmationEditDialogRowEnabled'

import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';

import './user-items.scss';

function UserItems(props) {

    const [user, setUser] = useState(props.user);
    const [copyUser, setCopyUser] = useState({...user})
    const [open, setOpen] = useState(false);

    const [authorities] = useState([{ id: 1, authority: 'ROLE_ADMIN' }, { id: 2, authority: 'ROLE_USER' }]);

    const [openListEnabled, setOpenListEnabled] = useState(false);
    const [openListAuthority, setOpenListAuthority] = useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

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

    const handleClose = () => {
        setOpen(false);
    };

    const usernameFormHandler = e => {
        setCopyUser({ ...copyUser, [e.target.name]: e.target.value })
    }

    const enabledFormHandler = (newEnabled) => {
        setCopyUser({ ...copyUser, enabled: newEnabled })
        setOpenListEnabled(false);
    }

    const authorityFormHandler = (e) => {
        console.log(e)
        if (e != null) {
            setCopyUser({ ...copyUser, authority: { id: e.id, authority: authorities[e.id - 1].authority } })
        }
        setOpenListAuthority(false);
    }

    const cancel = () => {
        setCopyUser({...user})
        handleClose()
    }

    const update = () => {
        props.onUpdate(copyUser)
        setUser({...copyUser})
        handleClose()
    }

    return (
        <Card className="card fade-in example-card">
            <CardContent>
                <p className="mat-card-header">
                    <Typography>
                        Username
                        </Typography>
                    <Typography>
                        {user.username}
                    </Typography>
                    <Typography>
                        Enabled
                        </Typography>
                    <Typography>
                        {user.enabled}
                    </Typography>
                    <Typography>
                        Authority
                        </Typography>
                    <Typography>
                        {user.authority.authority}
                    </Typography>
                </p>
            </CardContent>
            <CardActions>
                <Button size="small" color="primary" onClick={() => props.onResetPassword(user)} >
                    Reset password
                    </Button>
                <Button size="small" color="primary" onClick={() => handleClickOpen()}>
                    Edit
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
                            defaultValue={copyUser.username}
                            fullWidth
                        />
                        <List>
                            <ListItem button divider onClick={handleClickListItemEnabled}>
                                <ListItemText primary="Enabled" secondary={copyUser.enabled} />
                            </ListItem>
                            <ConfirmationEditDialogRowEnabled
                                name="enabled"
                                keepMounted
                                open={openListEnabled}
                                onClose={handleCancelListItemEnabled}
                                onOk={enabledFormHandler}
                                defaultValue={copyUser.enabled}
                                valueEna={copyUser.enabled}
                            />
                        </List>
                        <List>
                            <ListItem button divider onClick={handleClickListItemAuthority}>
                                <ListItemText primary="Authority" secondary={copyUser.authority.authority} />
                            </ListItem>
                            <ConfirmationEditDialogRowAuthority
                                name="authority"
                                keepMounted
                                open={openListAuthority}
                                onClose={handleCancelListItemAuthority}
                                onOk={authorityFormHandler}
                                defaultValue={copyUser.authority.authority}
                                valueAuth={copyUser.authority}
                            />
                        </List>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={cancel} color="primary">
                            Annuler
                                </Button>
                        <Button onClick={update} color="primary">
                            Editer
                                </Button>
                    </DialogActions>
                </Dialog>
                <Button color="secondary" variant="outlined"
                    size="small" onClick={() => props.onDelete(user)}>Supprimer</Button>
            </CardActions>
        </Card>
    );
}

export default UserItems;