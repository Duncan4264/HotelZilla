// Imported dependencys 
import {Link, useHistory} from 'react-router-dom';
import {useSelector, useDispatch} from 'react-redux';

/*
* Method to hanlde the state and render Top Menu Nav Component 
*/
const TopMenuNav = () => {
  // insert the google maps api script with API
  <script src="https://maps.googleapis.com/maps/api/js?key=AIzaSyBfKVxIHgitMA1YkVdBGNR4m-TLVa-aUZo&libraries=places"></script>
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
  return (
    <div className=" nav bg-light d-flex justify-content-between">
      <Link className="nav-link" to="/">Home</Link>


      {auth !== null &&
      <Link className="nav-link" to="/dashboard">Dashboard</Link>
      } 


    {auth === null && <>
      <Link className="nav-link" to="/login">Login</Link>
      <Link className="nav-link" to="/register">Register</Link></>}
      {auth !== null && (
         <a className="nav-link" href="/login" onClick={logout}>Logout</a>
      )} 
    </div>
  );
}


export default TopMenuNav;