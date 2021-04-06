import React from 'react';
import AuthSocialIcons from './auth-social-icons';
import LoginForm from './login-form';
import { BrowserRouter as Link } from "react-router-dom";

function Login(props) {
    return (
        <div className='auth'>
            <h1>Login</h1>
            <LoginForm setToken={props.setToken} />
            <p>Not Signed Up?</p>
            <a href='/signup'> <p> <strong> <Link to='/signup' >SIGN UP</Link> </strong> </p> </a>
            <p>Or Sign Up Using</p>
            <AuthSocialIcons />
        </div>
    )
}

export default Login