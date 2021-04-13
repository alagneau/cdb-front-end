import React from 'react';
import { Computer } from "../Models/computer.model"; // Le model n'est pas utilisé et je ne sais pas comment l'utiliser
import DeleteOutlineOutlinedIcon from '@material-ui/icons/DeleteOutlineOutlined';


export default function ComputerComponent(props) {
    const [computer, setComputer] = React.useState(props.computer);

    const handleClick = (event) => {
        if ( event.target.checked === true ) {
            props.pushComputerToDelete(computer);
        }
        else {
            props.takeOutComputerToDelete(computer);
        }
    }
    
    return (
        <tr>
            <td>
                {props.checkall ?
                <input type="checkbox" name="cb" onClick={handleClick} checked />
                :
                <input type="checkbox" name="cb" onClick={handleClick} />
                }
                
                <DeleteOutlineOutlinedIcon onClick={() => props.handleDelete(computer)}/>
            </td>
            <td>{computer.name}</td>
            <td>{computer.introduced}</td>
            <td>{computer.discontinued}</td>
            <td>
                {computer.company !== null && computer.company.name}
            </td>
        </tr>
    );
}