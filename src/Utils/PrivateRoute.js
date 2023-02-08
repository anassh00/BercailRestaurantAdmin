import React from 'react'
import { Navigate } from 'react-router-dom'
import authService from '../Services/auth.service.js';
import * as ConstFile from '../Utils/Const.js'

const PrivateRoute = ({ children }) => {
    const authed = authService.getCurrentUser(); // returns value or null based on localStorage
    console.log(authed);
    return authed ? children : <Navigate to="/Login" />;
  }

export default PrivateRoute