import React, { useState } from 'react';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import './company.item.css';

function CompanyItem(props) {
    const [edit, setEdit] = useState(props.edit);
    const [company, setCompany] = useState(props.company);

    const updateInputValue = (e) => {
        let copy = { ...company };
        copy[e.target.name] = e.target.value;
        setCompany(copy);
      }

    return (
        <Card className="card fade-in example-card">
            <CardContent>
                {edit
                    ? <input type="text" defaultValue={company.name} name="name" type="text" onChange={(e) => updateInputValue(e)} />
                    : <p className="mat-card-header">
                        {company.name}
                    </p>}
            </CardContent>
            <CardActions>
                <button onClick={() => setEdit(!edit)}>Edit</button>
                <button onClick={() => props.onDelete(props.company)}>Delete</button>
            </CardActions>
        </Card>
    );
}

export default CompanyItem;