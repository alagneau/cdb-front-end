import React, { useState } from "react";
import { MOCK_COMPUTERS } from "../../assets/Mock_Computer_CDB";
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import Computer from "../Items/Computer";

import PropTypes from 'prop-types';


export default function ComputerBoard() {
   
    const [computers, setComputers] = useState(MOCK_COMPUTERS);
    const [computersToDelete, setComputersToDelete] = useState([]);
    const [creationActivated, setCreationActivated] = useState(false);


    const pushComputerToDelete = (computer) => {
        if (!computersToDelete.includes(computer)) {
            let copy = [...computersToDelete];
            copy.push(computer);
            setComputersToDelete(copy);
        }
    }



    const takeOutComputerToDelete = (computer) => {
        if (computersToDelete.includes(computer)) {
            let copy = [...computersToDelete];
            copy.splice(copy.indexOf(computer), 1);
            setComputersToDelete(copy);
        }
    }



    const handleEdit = (computerEdited) => {
        let copy = [...computers];
        copy.splice(copy.indexOf(computers.find(comp => comp.id === computerEdited.id)), 1, computerEdited);
        setComputers(copy);
    }    



    const handleDeleteSelection = () => {
        let computersRemaining = computers.filter( computer => {
            return !computersToDelete.includes(computer);
        });
        setComputersToDelete([]);
        setComputers(computersRemaining);
    }


  
    const handleDelete = (computer) => {
        let copyComputers = [...computers];
        let index = copyComputers.indexOf(computer);

        let computerDeleted = copyComputers.splice(index, 1);
        setComputers(copyComputers);

        if ( computersToDelete.includes(computer) ) {
            let copyComputersToDelete = [...computersToDelete];
            copyComputersToDelete.splice(copyComputersToDelete.indexOf(computer), 1);
            setComputersToDelete(copyComputersToDelete);
        }
    }
    


    const toggleCheckAll = (event) => {
        if ( event.target.checked === true ) {

            let copy = [...computersToDelete];
            
            computers.map( computer => {
                if ( !copy.includes(computer) ) {
                    copy.push(computer);
                }
            });

            setComputersToDelete(copy);
        }
        else {
            setComputersToDelete([]);
        }
    }


    // Rudimentary version.
    // Doesn't work yet
    const createComputer = (event) => {
        const computer = {
            id: 500,
            name: event.target[0].value,
            introduced: event.target[1].value,
            discontinued: event.target[2].value,
            company: {
                id: null,
                name: event.target[3].value
            }
        };
        console.log(computer);
        let copy = [...computers];
        copy.push(computer);
        setComputers(copy);
        event.preventDefault();
    }


    return (
        <div>
        <table>
            <thead>
                <tr>
                    <th>Computer name</th>
                    <th>Introduced date</th>
                    <th>Discontinued date</th>
                    <th>Company</th>
                    <th>
                        <input type="checkbox" onClick={toggleCheckAll}/>
                        <DeleteForeverIcon fontSize="large" onClick={handleDeleteSelection} />
                    </th>
                </tr>
            </thead>
            <tbody>
                {computers.map( computer => {
                    return (
                        <Computer 
                            key = {computer.id}
                            computer = {computer}
                            pushComputerToDelete = {pushComputerToDelete}
                            takeOutComputerToDelete = {takeOutComputerToDelete}
                            handleDelete = {handleDelete}
                            handleEdit = {handleEdit}
                            isChecked = {computersToDelete.includes(computer)}
                        />
                    );
                })}
            </tbody>
        </table>

        {creationActivated && 
            <form onSubmit={createComputer}>
                <table>
                    <tbody>
                        <tr>
                        <td><input type="text" placeholder="Computer Name" size="15" /></td>
                        <td><input type="date" placeholder="Introduced Date" size="15" /></td>
                        <td><input type="date" placeholder="Discontinued Date" size="15" /></td>
                        <td><input type="text" placeholder="Company Name" size="15" /></td>
                        <td>
                            <button type="submit">ADD</button>
                            <button onClick={() => setCreationActivated(false)}>CANCEL</button>
                        </td>
                        </tr>
                    </tbody>
                </table>
            </form>
        }

        {!creationActivated &&
            <button onClick={() => setCreationActivated(true)}>New Computer</button>
        }
        </div>
    );


}

ComputerBoard.propTypes = {
    // No props
}