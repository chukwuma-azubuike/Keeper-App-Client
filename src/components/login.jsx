import React from 'react';
import AuthSocialIcons from './auth-social-icons'
import LoginForm from './login-form'

import { BrowserRouter, Link } from "react-router-dom";

function Login() {
    return (
        <div className='auth'>
            <h1>Login</h1>
            <LoginForm />
            <p>Not Signed Up?</p>
            <a href=''> <p> <strong> <Link to='/signup' >SIGN UP</Link> </strong> </p> </a>
            <p>Or Sign Up Using</p>
            <AuthSocialIcons />
        </div>
    )
}

export default Login