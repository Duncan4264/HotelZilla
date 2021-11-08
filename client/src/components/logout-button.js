import React from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import {useDispatch} from 'react-redux';

const LogoutButton = () => {
  // Create dispatch from react redux
    const dispatch = useDispatch();
  // create history variable from react-router-dom

  const { logout } = useAuth0();
  const handleLogout = () => {
    
       // dispatch the logout to the react redux
       dispatch({
        type: 'LOGOUT',
        payload: null
      });
      // remove auth token from local storage
      window.localStorage.removeItem('auth');
      // push login URI
    logout({
      returnTo: window.location.origin,
    })
  }
  return (
    <button
      className="btn btn-danger btn-block"
      onClick={() =>
        handleLogout()
      }

    >
      Log Out
    </button>
  );
};

export default LogoutButton;