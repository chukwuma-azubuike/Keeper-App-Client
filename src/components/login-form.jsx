import React, { useState } from 'react';
import Button from "./form-components/button";
import Label from './form-components/input-label';
import PropTypes from 'prop-types';

//Post request to submit credentials to server
async function submit(username, password) {

    const url = "http://localhost:9000/login";
    const data = {
        username: username,
        password: password
    }

    return fetch(url, {
        method: 'POST',
        mode: 'cors',
        credentials: 'include',
        body: JSON.stringify(data),
        headers: {
            'Content-Type': 'application/json'
        }
    })
        .then(res => res.body)
        .then(body => body.getReader().read()) //Read Stream buffer
        .then(res => res.value) //Read value of unitArray buffer
        .then(res => {
            var string = new TextDecoder().decode(res) //Decode unitArray buffer
            const data = JSON.parse(string); //Parse to convert to JSON 
            return data;
        })
        .then(res => {
            if (res.status === 'OK') {
                console.log(res)
                return res.token
            } else {
                // alert('Incorrect credentials')
            }
        })
        .catch(err => {
            console.log(err)
            // alert('Incorrect Credentials')
            return err;
        })
}

function LoginForm(props) {

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = async e => {
        e.preventDefault();
        const derivedToken = await submit(
            username,
            password
        );
        console.log(derivedToken);
        props.setToken(derivedToken)
    }

    return <form action='/login' onSubmit={handleSubmit} >
        <div className='label-div' ><Label label='Username' /></div>
        <input name='username' placeholder='Enter your username' type='text'
            onChange={(e) => {
                setUsername(e.target.value);
            }} required />

        <div className='label-div' ><Label label='Password' /></div>
        <input
            value={password}
            name='password' placeholder='Enter your password' type='password'
            onChange={(e) => {
                setPassword(e.target.value);
            }} required />
        <Button buttonText='LOGIN' />
    </form>
}

LoginForm.propTypes = {
    setToken: PropTypes.func.isRequired
}

export default LoginForm;