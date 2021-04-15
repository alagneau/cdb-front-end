import CompanyItem from "../../Items/Company/company.item";
import React, { useState, useEffect } from 'react';
import './company.board.css';
import '../../Items/Company/company.item.css';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import SaveAltIcon from '@material-ui/icons/SaveAlt';
import CloseIcon from '@material-ui/icons/Close';

export default function CompanyBoard() {

    const url = 'http://localhost:8080/webapp/APICompany';
    const [edit, setEdit] = useState(false);
    const [companies, setCompanies] = useState([]);
    const [error, setError] = useState(null);
    const token = localStorage.getItem("token");
    const [open, setOpen] = useState(false);
    const [name, setName] = useState("");

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
        setName('');
    };

    const getApiList = () => {
        fetch(`${url}/list`,
            {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${token}`,
                }
            })
            .then(data => data.json())
            .then(
                (result) => {
                    setCompanies(result);
                },
                (error) => {
                    setError(error);
                }
            );
    }

    const deleteCompany = async (company) => {
        await fetch(`${url}/delete?id=` + company.id, {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${token}`,
            }
        });
        getApiList();
    }

    const updateCompany = async (event, id) => {
        await fetch(`${url}/update`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
            body: JSON.stringify({
                id: id,
                logo: 'sdf',
                name: `${event.target.value}`
            })
        });
        getApiList();
    }

    const createCompany = async (company) => {
        await fetch(`${url}/add`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
            body: JSON.stringify({
                logo: '',
                name: `${company.target.value}`
            })
        });
        getApiList();
    }

    useEffect(() => {
        getApiList();
    }, [])

    const handleChange = (e) => {
        if (e.target.value === "") {
            setName("")
        } else {
            setName(e);
        }
    }

    return (
        <div className="show-recipes">
            {companies.map((elem) =>
                <CompanyItem onUpdate={updateCompany}
                    edit={edit} company={elem} onDelete={deleteCompany} key={elem.id} />)}
            <Button size="small" variant="outlined" color="primary" onClick={handleClickOpen}>
                Créer une entreprise
            </Button>
            <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
                <DialogTitle id="form-dialog-title">Formulaire de création</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Entrer un nom d'entreprise à créer.
                    </DialogContentText>
                    <TextField
                        autoFocus
                        margin="dense"
                        id="name"
                        label="Nom"
                        type="text"
                        fullWidth
                        onChange={handleChange}
                        error={name === ""}
                        helperText={name === "" ? 'Champ vide!' : ''}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="secondary" variant="outlined" 
                            size="small" endIcon={<CloseIcon />}>
                        Annuler
                    </Button>
                    <Button size="small" variant="outlined" disabled={!name} 
                            onClick={() => { createCompany(name); handleClose(); setName('') }} 
                            color="primary" endIcon={<SaveAltIcon />}>
                        Créer
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}