import CompanyBoard from '../../Boards/Company/company.board'
import './company.view.css'

function CompanyView() {
    return (
        <body>
            <header>
                <div className="header">
                    <p>Company</p>
                    <button>Add Company</button>
                </div>
            </header>
            <div className="test">
                <div className="menu">
                    Test
                </div>
                <CompanyBoard />
                
            </div>
        </body>
    );
}

export default CompanyView;