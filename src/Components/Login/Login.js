import React, { useState } from 'react';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import './Login.css'
import { Form, Button, FormGroup, Input, Label } from 'reactstrap';
import authService from '../../Services/auth.service';

const Login = () => {

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const currentUser = authService.getCurrentUser();

    const handleChangeUsername = (event) => {
        setUsername(event.target.value);
    }

    const handleChangePassword = (event) => {
        setPassword(event.target.value)
    }

    let navigate = useNavigate();
    const routeChange = (path) => {
        navigate(path);
    }

    const handleLogin = () => {
        authService.login(username, password).then(
            () => {
                routeChange('/')
            }, error => {
                console.log("auth failed")
            }
        )
    }

    return !currentUser ?
        <div>
            <div className='divContainer'>
                <div style={{ fontWeight: 'bold', color: 'white', fontSize: "40px", textAlign : "center", marginTop : "40px" }}>Au Bercail Admin</div>
                <Form className='loginForm'>
                    <FormGroup>
                        <Label for="exampleEmail">Username</Label>
                        <Input
                            type="email"
                            name="email"
                            id="exampleEmail"
                            placeholder="example@example.com"
                            onChange={handleChangeUsername}
                        />
                    </FormGroup>
                    <FormGroup>
                        <Label for="examplePassword">Mot de passe</Label>
                        <Input
                            type="password"
                            name="password"
                            id="examplePassword"
                            placeholder="********"
                            onChange={handleChangePassword}
                        />
                    </FormGroup>
                    <Button style={{marginBottom : "10px"}} onClick={handleLogin}>Connecter</Button>
                    <br></br>
                    {/* <Link style={{ color: 'white' }} to='/Register'>Créer un compte</Link> */}
                </Form>
            </div>
        </div>
        :
        <Navigate to="/" />
}

export default Login