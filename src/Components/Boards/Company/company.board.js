import { MOCK_COMPANY } from "../../../Data/Mock_Company";
import CompanyItem from "../../Items/Company/company.item";
import React, { useState } from 'react';
import './company.board.css';
import '../../Items/Company/company.item.css';

export default function CompanyBoard() {

    const deleteCompany = (id) => {
        let copyCompanies = [...companies];
        console.log(id)
        console.log(copyCompanies.indexOf(id))
        copyCompanies.splice(copyCompanies.indexOf(id), 1)
        setCompanies(copyCompanies)
    }

    const createCompany = () => {
        let copyCompanies = [...companies];
        copyCompanies.push({ id: "", name: "" })
        copyCompanies[copyCompanies.length - 1].id = copyCompanies.length
        setEdit(true)
        setCompanies(copyCompanies)
    }

    
    const [edit, setEdit] = useState(false);
    const [companies, setCompanies] = useState(MOCK_COMPANY);

    return (
        <div className="show-recipes">
            {companies.map((elem) =>
                <CompanyItem edit={edit} company={elem} onDelete={deleteCompany} key={elem.id} />)}
            <button className="card fade-in example-card" onClick={createCompany}>Add</button>
        </div>
    );
}