import React, { useState } from 'react';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import './company.item.css';
import Button from '@material-ui/core/Button';

function CompanyItem(props) {
    const [edit, setEdit] = useState(props.edit);
    const [company, setCompany] = useState(props.company);

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

    return (
        <Card className="card fade-in example-card">
            <CardContent>
                {edit
                    ? <input type="text" defaultValue={company.name} name="name" autoFocus type="text" onKeyDown={(e) => handleKeyDown(e, company.id)} />
                    : <p className="mat-card-header" onDoubleClick={() => { setEdit(true) }}>
                        {company.name}
                    </p>}
            </CardContent>
            <CardActions>
                <Button color="secondary" variant="outlined" 
                            size="small" onClick={() => props.onDelete(company)}>Supprimer</Button>
            </CardActions>
        </Card>
    );
}

export default CompanyItem;