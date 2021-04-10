import React from 'react';
import SignUpForm from './signup-form';
import AuthSocialIcons from './auth-social-icons'
import { BrowserRouter as Link } from "react-router-dom";
import Home from './home';
import useToken from '../useToken';

function SignUp() {

    const { token } = useToken();
    if (token) { return <Home /> }

    return (
        <div className='auth'>
            <h1>Sign Up</h1>
            <SignUpForm />
            <p>Have an Account Already?</p>
            <a href='/login' > <p> <strong> <Link to='/login' >LOGIN</Link> </strong> </p> </a>
            <p>Or Login Using</p>
            <AuthSocialIcons />
        </div>
    )
}

export default SignUp