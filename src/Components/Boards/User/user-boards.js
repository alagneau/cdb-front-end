import { React, useState } from 'react';
import '../../../App.css';
import MOCK_USERS from '../../../data/mock_user'
import UserItems from '../../Items/User/user-items'
import PersonAddRoundedIcon from '@material-ui/icons/PersonAddRounded';
import SearchInput from '../../Input/Search/search';

function UserBoards() {
    const [edit, setEdit] = useState(false);
    const [users, setUsers] = useState(MOCK_USERS);

    const useDelete = (props) => {
        let temp = [...users];
        temp.splice(temp.indexOf(props), 1);
        setUsers(temp);
    }

    const createUser = () => {
        let temp = [...users]


        console.log(temp)
        temp.push(
            {
                "id": Math.max(...temp.map(value => value.id)) + 1,
                "username": "",
                "enabled": "",
                "authority":
                {
                    "id": "",
                    "authority": ""
                }
            }
        )
        setEdit(true)
        setUsers(temp)
    }

    function useEdit(edit) {
        return !edit
    }

    return (
            <div className="section">
                <SearchInput /><br />
                <ul>
                    <li >
                        <div className="name">Name</div>
                        <span className="other">Enabled</span>
                        <span className="other">Authority</span>
                        <span className="other">Actions</span>
                    </li>
                    <ul>
                        {users.map((elem) =>
                            <UserItems edit={edit} user={elem} onDelete={useDelete} onEdit={useEdit} key={elem.id} />)}
                    </ul>
                </ul>
                <PersonAddRoundedIcon style={{ color: "blue" }} onClick={() => createUser()} />
            </div>
    );
}

export default UserBoards;