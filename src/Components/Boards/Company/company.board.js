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
import TablePagination from '@material-ui/core/TablePagination';

export default function CompanyBoard() {

    const url = 'http://localhost:8080/webapp/APICompany';
    const [edit, setEdit] = useState(false);
    const [companies, setCompanies] = useState([]);
    const [error, setError] = useState(null);
    const token = localStorage.getItem('access_token');
    const [open, setOpen] = useState(false);
    const [name, setName] = useState("");
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [ count, setCount ] = useState(0);

    const countCompanies = async () => {
        await fetch(`${url}/count`,
            {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${token}`,
                }
            })
            .then(data => data.json())
            .then(
                (result) => {
                    setCount(result);
                },
                (error) => {
                    setError(error);
                }
            );
    }

    const handleChangePage = async (event, newPage) => {
        setPage(newPage);
        await fetch(`${url}/page/${newPage}/${rowsPerPage}`,
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
    };

    const handleChangeRowsPerPage = async (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
        const limit = parseInt(event.target.value, 10);
        const index = 0;
        await fetch(`${url}/page/${index}/${limit}`,
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
    };

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
        setName('');
    };

    const getApiList = async () => {
        await fetch(`${url}/page/${page}/${rowsPerPage}`,
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
        countCompanies();
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
                logo: 'https://previews.123rf.com/images/iamnee/iamnee1301/iamnee130100165/17417606-fourniture-de-bureau-une-illustration-de-dessin-anim%C3%A9-d-ordinateur-personnel-de-bureau-dans-circle-.jpg',
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
                logo: 'https://previews.123rf.com/images/iamnee/iamnee1301/iamnee130100165/17417606-fourniture-de-bureau-une-illustration-de-dessin-anim%C3%A9-d-ordinateur-personnel-de-bureau-dans-circle-.jpg',
                name: `${company.target.value}`
            })
        });
        getApiList();
        countCompanies();
    }

    useEffect(() => {
        getApiList();
        countCompanies();
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
            <TablePagination
                component="div"
                count={count}
                page={page}
                rowsPerPage={rowsPerPage}
                onChangePage={handleChangePage}
                onChangeRowsPerPage={handleChangeRowsPerPage}
            />
        </div>
    );
}