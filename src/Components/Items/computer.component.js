import React, { useState } from 'react';
import { Computer } from "../Models/computer.model"; // Le model n'est pas utilisé et je ne sais pas comment l'utiliser
import DeleteOutlineOutlinedIcon from '@material-ui/icons/DeleteOutlineOutlined';
import EditIcon from '@material-ui/icons/Edit';


export default function ComputerComponent(props) {
    const [computer, setComputer] = useState(props.computer);
    const [editMode, setEditMode] = useState(false);

    const handleClick = (event) => {
        if ( event.target.checked === true ) {
            props.pushComputerToDelete(computer);
        }
        else {
            props.takeOutComputerToDelete(computer);
        }
    }

    const displayComputerField = (input, fieldName) => {
        return(
            <td>
                {editMode ?
                    <input placeholder={input} size="15" onChange={(event) => handleChangeComputerField(event, fieldName)}/>
                    :
                    input
                }
            </td>
        );
    }

    const displayCompanyField = (input, fieldName) => {
        return(
            <td>
                {editMode ?
                    <input placeholder={input} size="15" onChange={(event) => handleChangeCompanyField(event, fieldName)} />
                    :
                    input
                }
            </td>
        );
    }

    const handleChangeComputerField = (event, fieldName) => {
        let computerModified = {...computer};
        computerModified[fieldName] = event.target.value;
        setComputer(computerModified);
        props.handleEdit(computerModified);
    }

    const handleChangeCompanyField = (event, fieldName) => {
        let computerModified = {...computer};
        computerModified.company[fieldName] = event.target.value;
        setComputer(computerModified);
        props.handleEdit(computerModified);
    }

    const changeEditMode = () => {
        let contrary = !editMode;
        setEditMode(contrary);
    }
    
    return (
        <tr>
            {displayComputerField(computer.name, "name")}
            {displayComputerField(computer.introduced, "introduced")}
            {displayComputerField(computer.discontinued, "discontinued")}
            {computer.company !== null ? 
                displayCompanyField(computer.company.name, "name")
                :
                displayCompanyField(null, "name")
            }
            <td>
                {props.checkall ?
                <input type="checkbox" name="cb" onClick={handleClick} checked />
                :
                <input type="checkbox" name="cb" onClick={handleClick} />
                }
                <DeleteOutlineOutlinedIcon onClick={() => props.handleDelete(computer)}/>
                <EditIcon onClick={changeEditMode}/>
            </td>
        </tr>
    );
}