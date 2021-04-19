import React, { useEffect, useState } from 'react';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardHeader from '@material-ui/core/CardHeader';
import './company.item.css';
import Button from '@material-ui/core/Button';
import Avatar from '@material-ui/core/Avatar';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import CloseIcon from '@material-ui/icons/Close';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TableFooter from '@material-ui/core/TableFooter';
import TablePagination from '@material-ui/core/TablePagination';
import Paper from '@material-ui/core/Paper';

function CompanyItem(props) {
    const [edit, setEdit] = useState(props.edit);
    const [company, setCompany] = useState(props.company);
    const token = localStorage.getItem('access_token');
    const [computers, setComputers] = useState([]);
    const url = 'http://localhost:8080/webapp/APIComputer';
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
        fetch(`${url}/ByCompany/${company.id}/page/${newPage}/10`,
            {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${token}`,
                }
            })
            .then(data => data.json())
            .then(
                (result) => {
                    setComputers(result);
                }
            );
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
        const limit = parseInt(event.target.value, 10);
        fetch(`${url}/ByCompany/${company.id}/page/0/${limit}`,
            {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${token}`,
                }
            })
            .then(data => data.json())
            .then(
                (result) => {
                    setComputers(result);
                }
            );
    };

    const [open, setOpen] = useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const updateInputValue = (e, id) => {
        props.onUpdate(e, id);
    }

    const handleKeyDown = (e, id) => {
        if (e.key === 'Enter') {
            updateInputValue(e, id);
            const copy = { ...company };
            copy[e.target.name] = e.target.value;
            setCompany(copy)
            setEdit(false);
        } else if (e.key === 'Escape') {
            setEdit(false);
        }
    }

    const getComputers = () => {
        fetch(`${url}/ByCompany/${company.id}/page/${page}/${rowsPerPage}`,
            {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${token}`,
                }
            })
            .then(data => data.json())
            .then(
                (result) => {
                    setComputers(result);
                }
            );
    }

    return (
        <Card className="card fade-in example-card">
            <CardHeader
                avatar={
                    <Avatar src="https://previews.123rf.com/images/iamnee/iamnee1301/iamnee130100165/17417606-fourniture-de-bureau-une-illustration-de-dessin-anim%C3%A9-d-ordinateur-personnel-de-bureau-dans-circle-.jpg" />
                }
                title={edit
                    ? <input type="text" defaultValue={company.name} name="name" autoFocus type="text" onKeyDown={(e) => handleKeyDown(e, company.id)} />
                    : <p className="mat-card-header" onDoubleClick={() => { setEdit(true) }}>
                        {company.name}
                    </p>}
            />
            <CardActions>
                <Button color="secondary" variant="outlined"
                    size="small" onClick={() => props.onDelete(company)}>Supprimer</Button>
                <Button color="primary" variant="outlined" size="small" onClick={() => { handleClickOpen(); getComputers() }}>
                    Détails
                </Button>
                <Dialog open={open} onClose={handleClose} fullWidth maxWidth="md">
                    <DialogTitle>{company.name}</DialogTitle>
                    <DialogContent>
                        <DialogContentText>
                            {/* <div style={{ height: 400, width: '100%' }}>
                                <DataGrid rows={rows} columns={columns} pageSize={5} checkboxSelection />
                            </div> */}
                            <TableContainer component={Paper}>
                                <Table size="small" aria-label="a dense table">
                                    <TableHead>
                                        <TableRow>
                                            <TableCell>Nom</TableCell>
                                            <TableCell align="center">Date d'introduction</TableCell>
                                            <TableCell align="right">Date d'abandon</TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {computers.map((row) => (
                                            <TableRow key={row.id}>
                                                <TableCell component="th" scope="row">
                                                    {row.name}
                                                </TableCell>
                                                <TableCell align="center">{row.introduced}</TableCell>
                                                <TableCell align="right">{row.discontinued}</TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                    <TableFooter>
                                        <TableRow>
                                            <TablePagination
                                                component="div"
                                                count={50}
                                                page={page}
                                                rowsPerPage={rowsPerPage}
                                                onChangePage={handleChangePage}
                                                onChangeRowsPerPage={handleChangeRowsPerPage}
                                            />
                                        </TableRow>
                                    </TableFooter>
                                </Table>
                            </TableContainer>
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button open={open} onClick={handleClose} color="secondary" variant="outlined"
                            size="small" endIcon={<CloseIcon />}>
                            Annuler
                        </Button>
                    </DialogActions>
                </Dialog>
            </CardActions >
        </Card >
    );
}

export default CompanyItem;