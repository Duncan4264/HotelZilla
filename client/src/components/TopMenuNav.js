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
    <nav class="navbar navbar-light navbar-expand-md sticky-top navigation-clean-button" style={NavbarStyle}>
        <div class="container-fluid"><a class="navbar-brand text-white" href="/"><i class="fa fa-home"/> HotelZilla</a><button data-bs-toggle="collapse" class="navbar-toggler" data-bs-target="#navcol-1"><span class="visually-hidden">Toggle navigation</span><span class="navbar-toggler-icon"></span></button>
            <div class="collapse navbar-collapse" id="navcol-1">
                <ul class="navbar-nav ms-auto">
                    <li class="nav-item"><a class="nav-link active" style={NavItemStyle} href="/"><i class="fa fa-home"></i> Home</a></li>
                    {auth === null && <>
                    
                      <li><AuthNav /></li>
                    </>
                    }
                    {auth && <>
                    <li class="nav-item"><a class="nav-link active" style={NavItemStyle} href={`/user/${auth._id}`}><i class="fa fa-user-circle-o"></i> Profile</a></li>
                    <li class="nav-item"><a class="nav-link active" style={NavItemStyle} href="/dashboard"><i class="fa fa-wpexplorer"></i> Dashboard</a></li>
                      {/* <li class="nav-item"><a class="nav-link active" style={NavItemStyle} href="/login" onClick={logout}><i class="fa fa-sign-in"></i>Logout</a></li> */}
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