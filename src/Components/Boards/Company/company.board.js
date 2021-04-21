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
import axios from "axios";
import { baseURL } from "../../../libs/context";

export default function CompanyBoard() {

    const url = baseURL + "/APICompany";
    const [companies, setCompanies] = useState([]);
    const [open, setOpen] = useState(false);
    const [name, setName] = useState("");
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [count, setCount] = useState(0);
    const [error, setError] = useState([]);

    const countCompanies = async () => {
        await axios(
            {
                url: `${url}/count`,
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('access_token')}`,
                }
            })
            .then(
                (result) => {
                    setCount(result.data);
                }
            );
    }

    const handleChangePage = async (event, newPage) => {
        setPage(newPage);
        await axios(
            {
                url: `${url}/page/${newPage}/${rowsPerPage}`,
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('access_token')}`,
                }
            })
            .then(
                (result) => {
                    setCompanies(result.data);
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
        await axios(
            {
                url: `${url}/page/${index}/${limit}`,
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('access_token')}`,
                }
            })
            .then(
                (result) => {
                    setCompanies(result.data);
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
        await axios(
            {
                url: `${url}/page/${page}/${rowsPerPage}`,
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('access_token')}`,
                }
            })
            .then(
                (result) => {
                    setCompanies(result.data);
                },
                (error) => {
                    setError(error);
                }
            );
    }

    const deleteCompany = async (company) => {
        await axios(
            {
                url: `${url}/delete?id=` + company.id,
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('access_token')}`,
                }
            });
        getApiList();
        countCompanies();
    }

    const updateCompany = async (event, id) => {
        await axios(
            {
                url: `${url}/update`,
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('access_token')}`,
                },
                data: JSON.stringify({
                    id: id,
                    logo: 'https://previews.123rf.com/images/iamnee/iamnee1301/iamnee130100165/17417606-fourniture-de-bureau-une-illustration-de-dessin-anim%C3%A9-d-ordinateur-personnel-de-bureau-dans-circle-.jpg',
                    name: `${event.target.value}`
                })
            });
        getApiList();
    }

    const createCompany = async (company) => {
        await axios(
            {
                url: `${url}/add`,
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('access_token')}`,
                },
                data: JSON.stringify({
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
        <div>
            <div className="show-recipes">
                {companies.map((elem) =>
                    <CompanyItem onUpdate={updateCompany}
                        company={elem} onDelete={deleteCompany} key={elem.id} />)}
                <Button size="small" variant="outlined" color="primary" onClick={handleClickOpen}>
                    Add a company
            </Button>
                <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
                    <DialogTitle id="form-dialog-title">Creation form</DialogTitle>
                    <DialogContent>
                        <DialogContentText>
                            Name of the new company.
                    </DialogContentText>
                        <TextField
                            autoFocus
                            margin="dense"
                            id="name"
                            label="Name"
                            type="text"
                            fullWidth
                            onChange={handleChange}
                            error={name === ""}
                            helperText={name === "" ? 'Empty field!' : ''}
                        />
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleClose} color="secondary" variant="outlined"
                            size="small" endIcon={<CloseIcon />}>
                            Cancel
                    </Button>
                        <Button size="small" variant="outlined" disabled={!name}
                            onClick={() => { createCompany(name); handleClose(); setName('') }}
                            color="primary" endIcon={<SaveAltIcon />}>
                            Create
                    </Button>
                    </DialogActions>
                </Dialog>
            </div>
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