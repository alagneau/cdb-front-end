import React, { useEffect, useState } from 'react';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import CardHeader from '@material-ui/core/CardHeader';
import './company.item.css';
import Button from '@material-ui/core/Button';
import Avatar from '@material-ui/core/Avatar';
import TablePagination from '@material-ui/core/TablePagination';
import Collapse from '@material-ui/core/Collapse';
import IconButton from '@material-ui/core/IconButton';

function CompanyItem(props) {
    const [edit, setEdit] = useState(props.edit);
    const [company, setCompany] = useState(props.company);
    const token = localStorage.getItem('token');
    const [computers, setComputers] = useState([]);
    const url = 'http://localhost:8080/webapp/APIComputer';
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [expanded, setExpanded] = useState(false);

    const handleExpandClick = () => {
        setExpanded(!expanded);
    };

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

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
        getComputers();
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
        getComputers();
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

    useEffect(() => {
        getComputers()
    }, [])



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
            <CardContent>
                <ul>
                    {computers.map((elem) => {
                        return <li>{elem.name}</li>
                    })
                    }
                </ul>
                <TablePagination
                    component="div"
                    count={-1}
                    page={page}
                    onChangePage={handleChangePage}
                    rowsPerPage={rowsPerPage}
                    onChangeRowsPerPage={handleChangeRowsPerPage}
                />
            </CardContent>
            <CardActions>
                <Button color="secondary" variant="outlined"
                    size="small" onClick={() => props.onDelete(company)}>Supprimer</Button>
                <Button color="secondary" variant="outlined">
                    Détails
                </Button>
            </CardActions>
        </Card>
    );
}

export default CompanyItem;