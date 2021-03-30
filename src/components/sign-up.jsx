import React from 'react';
import SignUpForm from './signup-form';
import AuthSocialIcons from './auth-social-icons'
import { BrowserRouter, Link } from "react-router-dom";

function SignUp() {

    return (
        <div className='auth'>
            <h1>Sign Up</h1>
            <SignUpForm />
            <p>Have an Account Already?</p>
            <a href=''> <p> <strong><Link to='/login' >LOGIN</Link></strong> </p> </a>
            <p>Or Login Using</p>
            <AuthSocialIcons />
        </div>
    )
}

export default SignUp