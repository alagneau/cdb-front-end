import React, { useState } from 'react';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import './company.item.css';

function CompanyItem(props) {
    const [company, setCompany] = useState(props.company);

    return (
        <Card className="card fade-in example-card">
            <CardContent>
                {company.name}
            </CardContent>
            <CardActions>
                <button onClick={() => props.onDelete(props.company.id)}>Delete</button>
            </CardActions>
        </Card>
    );
}

export default CompanyItem;