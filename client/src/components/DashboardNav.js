import { Link } from 'react-router-dom';

const DashboardNav = () => {
    const active = window.location.pathname;
    return (
        <ul className="nav nav-tabs">
            <li className="nav-item p-5">
                <Link classname={`nav-link ${active === "/dasboard" && "active"}`} to="/dashboard"> Bookings </Link>
            </li>
            
            <li className="nav-item p-5">
                <Link classname={`nav-link ${active === "/dasboard/seller" && "active"}`} to="/dashboard/seller"> Hotels </Link>
            </li>
        </ul>
    );
};

export default DashboardNav;