import React from 'react';

import LoginButton from '../components/login-button';
import LogoutButton from '../components/logout-button';
import { useSelector } from "react-redux";


const AuthenticationButton = () => {
  const { auth } = useSelector((state) => ({ ...state }));

  return auth ? <LogoutButton /> : <LoginButton />;
};

export default AuthenticationButton;