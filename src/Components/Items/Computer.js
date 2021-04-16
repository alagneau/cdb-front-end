import React, { useState } from 'react';
import PropTypes from 'prop-types';
import DeleteOutlineOutlinedIcon from '@material-ui/icons/DeleteOutlineOutlined';
import EditIcon from '@material-ui/icons/Edit';


export default function Computer(props) {
    
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



    
    return (
        <tr>
            <td>
                {editMode ?
                    <input placeholder={computer.name} 
                           type="text"
                           size="15" 
                           onChange={(event) => handleChangeComputerField(event, "name")}
                    />
                    :
                    computer.name
                }
            </td>
            <td>
                {editMode ?
                    <input placeholder={computer.introduced} 
                           type="date"
                           size="15" 
                           onChange={(event) => handleChangeComputerField(event, "introduced")}
                    />
                    :
                    computer.introduced
                }
            </td>
            <td>
                {editMode ?
                    <input placeholder={computer.discontinued}
                           type="date" 
                           size="15" 
                           onChange={(event) => handleChangeComputerField(event, "discontinued")}
                    />
                    :
                    computer.discontinued
                }
            </td>
            <td>
                {editMode ?
                    <input placeholder={computer.company !== null && computer.company.name}
                           type="text" 
                           size="15" 
                           onChange={(event) => handleChangeCompanyField(event, "name")} 
                    />
                    :
                    computer.company !== null && computer.company.name
                }
            </td>
            <td>
                {props.isChecked ?
                    <input type="checkbox" name="cb" onClick={handleClick} checked />
                    :
                    <input type="checkbox" name="cb" onClick={handleClick} />
                }
                <DeleteOutlineOutlinedIcon onClick={() => props.handleDelete(computer)}/>
                <EditIcon onClick={() => setEditMode(!editMode)}/>
            </td>
        </tr>
    );
}

Computer.propTypes = {
    computer: PropTypes.object.isRequired,
    pushComputerToDelete: PropTypes.func.isRequired,
    takeOutComputerToDelete: PropTypes.func.isRequired,
    handleDelete: PropTypes.func.isRequired,
    handleEdit: PropTypes.func.isRequired,
    isChecked: PropTypes.bool.isRequired
};