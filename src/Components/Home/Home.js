import React from 'react'
import { useNavigate } from 'react-router-dom';
import authService from '../../Services/auth.service';
import NavBar from '../NavBar/NavBar';

const Home = () => {
    
  let navigate = useNavigate(); 
  const routeChange = (path) =>{ 
    navigate(path);
  }
    const logOut = () => {
        authService.logout();
        routeChange('/Login');
      };
  return (
    <div>
        <NavBar></NavBar>
    </div>
  )
}

export default Home