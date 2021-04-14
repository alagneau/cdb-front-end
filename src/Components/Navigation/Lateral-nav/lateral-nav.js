import '../../../App.css';
import { Link } from 'react-router-dom'

function LateralNav() {
    return (
        <div className="nav">
            <div className="nav-title">Title</div>
            <div className="nav-menu">
                <Link to="/">Home</Link>
                <Link to="/test">Test</Link>
            </div>
        </div>
    );
}

export default LateralNav;