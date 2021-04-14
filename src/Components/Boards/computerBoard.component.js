import React, { useState } from "react";
import { MOCK_COMPUTERS } from "../../assets/Mock_Computer_CDB";
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import ComputerComponent from "../Items/computer.component";

import PropTypes from 'prop-types';


export default function ComputerBoard(props) {
   
    const [computers, setComputers] = useState(MOCK_COMPUTERS);
    const [computersToDelete, setComputersToDelete] = useState([]);


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



    return (
        <div>
            <div align="right">
                <button>New Computer</button>
            </div>
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
                        <ComputerComponent 
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
        </div>
    );


}

ComputerBoard.propTypes = {

}