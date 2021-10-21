// Imported dependencys 
import {Link, useHistory} from 'react-router-dom';
import {useSelector, useDispatch} from 'react-redux';
import HotelFilled from '@ant-design/icons'

/*
* Method to hanlde the state and render Top Menu Nav Component 
*/
const TopMenuNav = () => {

  // Create dispatch from react redux
  const dispatch = useDispatch();
  // deconsturct auth from state
  const {auth} = useSelector((state) => ({...state}));


  // create history variable from react-router-dom
  const history = useHistory();

  // logout function
  const logout = () => {
    // dispatch the logout to the react redux
    dispatch({
      type: 'LOGOUT',
      payload: null
    });
    // remove auth token from local storage
    window.localStorage.removeItem('auth');
    // push login URI
    history.push("/login")
  }

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
                    
                    <li class="nav-item"><a class="nav-link active" style={NavItemStyle} href="/login"><i class="fa fa-sign-in"></i> Sign In</a></li>
                    </>
                    }
                    {auth && <>
                    <li class="nav-item"><a class="nav-link active" style={NavItemStyle} href={`/user/${auth.user._id}`}><i class="fa fa-user-circle-o"></i> Profile</a></li>
                    <li class="nav-item"><a class="nav-link active" style={NavItemStyle} href="/dashboard"><i class="fa fa-wpexplorer"></i> Dashboard</a></li>
                      <li class="nav-item"><a class="nav-link active" style={NavItemStyle} href="/login" onClick={logout}><i class="fa fa-sign-in"></i>Logout</a></li>
                    </>}
                </ul>
            </div>
        </div>
    </nav>
    </div>
  );
}


export default TopMenuNav;