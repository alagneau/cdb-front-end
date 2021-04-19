import { React, useState } from 'react';
import '../../../App.css';

import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Input from '@material-ui/core/Input';

import './user-items.scss';

function UserItems(props) {

    const [edit, setEdit] = useState(props.edit);
    const [user, setUser] = useState(props.user);

    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            console.log(user)
            props.onUpdate(user)
            const temp = { ...user };
            temp[e.target.name] = e.target.value;
            setUser(temp)
            setEdit(false);
        } else if (e.key === 'Escape') {
            setEdit(false);
        }
    }

    const updateUserName = (e) => {
        let temp = { ...user };
        temp[e.target.name] = e.target.value;
        setUser(temp);
    }

    const updateEnabled = (e) => {
        let temp = { ...user };
        temp[e.target.name] = e.target.value;
        setUser(temp);
    }

    const updateAuthority = (e) => {
        let temp = { ...user };
        temp.authority[e.target.name] = e.target.value;
        setUser(temp);
    }

    return (
        <Card className="card fade-in example-card">
            <CardContent>
                {edit
                    ? <form noValidate autoComplete="off" onKeyDown={(e) => handleKeyDown(e)}>
                         <TextField id="standard-basic" name="username" label="Username" defaultValue={user.username} onChange={(e) => updateUserName(e)} />
                         <TextField id="standard-basic" name="enabled" label="Enabled" defaultValue={user.enabled} onChange={(e) => updateEnabled(e)}/>
                         <TextField id="standard-basic" name="authority" label="Authority" defaultValue={user.authority.authority} onChange={(e) => updateAuthority(e)}/>
                      </form>
                    : <p className="mat-card-header">
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
                    </p>}
            </CardContent>
            {!edit
                ? <CardActions>
                    <Button size="small" color="primary" onClick={() => props.onResetPassword(user)} >
                        Reset password
                    </Button>
                    <Button size="small" color="primary">
                        Edit
                    </Button>
                    <Button color="secondary" variant="outlined"
                        size="small" onClick={() => props.onDelete(user)}>Supprimer</Button>
                </CardActions>
                : <p>Entrer pour valider / Echap pour annuler</p>}

        </Card>
    );
}

export default UserItems;