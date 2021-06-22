import {Link, useHistory} from 'react-router-dom';
import {useSelector, useDispatch} from 'react-redux';

const TopMenuNav = () => {
  const dispatch = useDispatch();
  const {auth} = useSelector((state) => ({...state}));
  const history = useHistory();
  const logout = () => {
    dispatch({
      type: 'LOGOUT',
      payload: null
    });
    window.localStorage.removeItem('auth');
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
         // eslint-disable-next-line jsx-a11y/anchor-is-valid
         <a className="nav-link-porinter" to="/login" onClick={logout}>Logout</a>
      )} 
    </div>
  );
}


export default TopMenuNav;