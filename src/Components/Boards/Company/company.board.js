import { MOCK_COMPANY } from "../../../Data/Mock_Company";
import CompanyItem from "../../Items/Company/company.item";
import React, { useState } from 'react';
import './company.board.css';
import '../../Items/Company/company.item.css';

export default function CompanyBoard() {

    const deleteCompany = (id) => {
        let copyCompanies = [...companies];
        copyCompanies.splice(copyCompanies[id - 1], 1)
        setCompanies(copyCompanies)
    }

    const createCompany = () => {
        let copyCompanies = [...companies];
        copyCompanies.push("")
        setCompanies(copyCompanies)
      }

    const [companies, setCompanies] = useState(MOCK_COMPANY);

    return (
        <div className="show-recipes">
            {companies.map((elem) =>
                <CompanyItem company={elem} onDelete={deleteCompany} key={elem.id} />)}
            <button className="card fade-in example-card" onClick={createCompany}>Add</button>
        </div>
    );
}