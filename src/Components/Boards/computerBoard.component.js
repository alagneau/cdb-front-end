import React, { useState } from "react";
import { MOCK_COMPUTERS } from "../../assets/Mock_Computer_CDB";
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import ComputerComponent from "../Items/computer.component";

export default function ComputerBoard(props) {
    const [computers, setComputers] = useState(MOCK_COMPUTERS);
    const [computersToDelete, setComputersToDelete] = useState([]);
    const [checkall, setCheckall] = useState(false);

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
        copy.filter(computer => {
            if ( computer.id === computerEdited.id ) {
                for (var field in computer) {
                    computer[field] = computerEdited[field];
                }
            }
        })
        setComputers(copy);
        console.log("computerBoard --> handleEdit --> computers:");
        console.log(computers);
    }    

    const handleDeleteSelection = () => {
        if ( checkall ) {
            setComputers([]);
        }
        else {
            let computersRemaining = computers.filter((computer) => {
                return !computersToDelete.includes(computer);
            })
            setComputers(computersRemaining);
        }
    }
  
    const handleDelete = (computer) => {
        let copyComputers = [...computers];
        copyComputers.splice(copyComputers.indexOf(computer), 1);
        setComputers(copyComputers);
        
        console.log("computerBoard --> handleDelete --> computers:");
        console.log(computers);

        if ( computersToDelete.includes(computer) ) {
            let copyComputersToDelete = [...computersToDelete];
            copyComputersToDelete.splice(copyComputersToDelete.indexOf(computer), 1);
            setComputersToDelete(copyComputersToDelete);
            
        }
        console.log("computer:");
        console.log(computer);
    }
    
    const toggleCheckAll = (event) => {
        setCheckall(!checkall);
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
                        <input type="checkbox" onChange={toggleCheckAll}/>
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
                            checkall = {checkall}
                        />
                    );
                })}
            </tbody>
        </table>
        </div>
    );


}