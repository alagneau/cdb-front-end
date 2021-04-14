import CompanyItem from "../../Items/Company/company.item";
import React, { useState, useEffect } from 'react';
import './company.board.css';
import '../../Items/Company/company.item.css';

export default function CompanyBoard() {

    const url = 'http://localhost:8080/webapp/APICompany';
    const [edit, setEdit] = useState(false);
    const [companies, setCompanies] = useState([]);
    const [error, setError] = useState(null);
    const token = '6f074d50-57b0-48cf-b1cc-dc71f4e99542';

    const getApiList = () => {
        fetch('http://localhost:8080/webapp/APICompany/list',
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

    const createCompany = async () => {
        let copyCompanies = [...companies];
        copyCompanies.push({ id: "", name: "" })
        copyCompanies[copyCompanies.length - 1].id = copyCompanies.length
        setEdit(true)
        setCompanies(copyCompanies)
    }

    useEffect(() => {
        getApiList();
    }, [])

    return (
        <div className="show-recipes">
            {companies.map((elem) =>
                <CompanyItem reloadData={getApiList} onUpdate={updateCompany} edit={edit} company={elem} onDelete={deleteCompany} key={elem.id} />)}
            <button className="card fade-in example-card" onClick={createCompany}>Add</button>
        </div>
    );
}