import { React, useState } from 'react';
import '../../../App.css';

import EditRoundedIcon from '@material-ui/icons/Edit';
import PersonAddDisabledRoundedIcon from '@material-ui/icons/PersonAddDisabledRounded';

function UserItems(props) {

    const [edit, setEdit] = useState(props.edit);
    const [user, setUser] = useState(props.user);

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
        <li>
            {edit
                ? <div className="name"><input type="text" defaultValue={user.username} name="name" type="text" onChange={(e) => updateUserName(e)} /></div>
                : <div className="name">{user.username}</div>}
            {edit
                ? <span className="other"><input type="text" defaultValue={user.enabled} name="enabled" type="text" onChange={(e) => updateEnabled(e)} /></span>
                : <span className="other">{user.enabled}</span>}
            {edit
                ? <span className="other"><input type="text" defaultValue={user.authority.authority} name="authority" type="text" onChange={(e) => updateAuthority(e)} /></span>
                : <span className="other">{user.authority.authority}</span>}

            <span className="other"><EditRoundedIcon style={{ color: "green" }} onClick={() => setEdit(!edit)} />
                <PersonAddDisabledRoundedIcon style={{ color: "red" }} onClick={() => props.onDelete(props.user)} /></span>
        </li>
    );
}

export default UserItems;