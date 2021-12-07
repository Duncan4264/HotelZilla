import { Link } from 'react-router-dom';

/*
 * Dashboard Naviagaion component
 */
const DashboardNav = () => {
  // Make a varaible to grab the window's path
  const active = window.location.pathname;
  return (
    <ul className="nav nav-tabs">
      <li className="nav-item">
        <Link
          className={`nav-link ${active === '/dashboard' && 'active'}`}
          to="/dashboard"
        >
          Your Bookings
        </Link>
      </li>
      <li className="nav-item">
        <Link
          className={`nav-link ${active === '/dashboard/seller' && 'active'}`}
          to="/dashboard/seller"
        >
          {' '}
          Your Hotels{' '}
        </Link>
      </li>
    </ul>
  );
};

export default DashboardNav;
