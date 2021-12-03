// Imported dependencys 

import {useSelector} from 'react-redux';
import AuthNav from './auth-nav';

/*
* Method to hanlde the state and render Top Menu Nav Component 
*/
const TopMenuNav = () => {


  // deconsturct auth from state
  const {auth} = useSelector((state) => ({...state}));

  const NavbarStyle = {
    height: "80px",
    background: "#37434d",
    color : "#ffffff"
  }
  const NavItemStyle = {
    color: "#ffffff"
  }
  return (
    <div>
<link href="https://maxcdn.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css" rel="stylesheet" />
    <nav className="navbar navbar-light navbar-expand-md sticky-top navigation-clean-button" style={NavbarStyle}>
        <div className="container-fluid"><a className="navbar-brand text-white" href="/"><i className="fa fa-home"/> HotelZilla</a><button data-bs-toggle="collapse" className="navbar-toggler" data-bs-target="#navcol-1"><span className="visually-hidden">Toggle navigation</span><span className="navbar-toggler-icon"></span></button>
            <div className="collapse navbar-collapse" id="navcol-1">
                <ul className="navbar-nav ms-auto">
                    <li className="nav-item"><a className="nav-link active" style={NavItemStyle} href="/"><i className="fa fa-home"></i> Home</a></li>
                    {auth === null && <>
                    
                      <li><AuthNav /></li>
                    </>
                    }
                    {auth && <>
                    {auth.admin && <li className="nav-item"><a className="nav-link" style={NavItemStyle} href="/admin"><i className="fa fa-user-secret"></i> Admin</a></li>}
                    <li className="nav-item"><a className="nav-link active" style={NavItemStyle} href={`/user/${auth._id}`}><i className="fa fa-user-circle-o"></i> Profile</a></li>
                    <li className="nav-item"><a className="nav-link active" style={NavItemStyle} href="/dashboard"><i className="fa fa-wpexplorer"></i> Dashboard</a></li>
                      {/* <li className="nav-item"><a className="nav-link active" style={NavItemStyle} href="/login" onClick={logout}><i className="fa fa-sign-in"></i>Logout</a></li> */}
                      <li><AuthNav /></li>
                    </>}
                </ul>
            </div>
        </div>
    </nav>
    </div>
  );
}


export default TopMenuNav;