import { React, useState } from 'react';
import '../../../App.css';

function CardUserDashboard(props) {

    const [title, setTitle] = useState(props.title);
    const [value, setValue] = useState(props.value);

    return (
            <div className="card">
                <span>{title}</span>
                <div className="card-text"> 
                    {value}
                </div>
            </div>
    );
}

export default CardUserDashboard;

