import React, { useState } from 'react';
import Button from "./form-components/button";
import Label from './form-components/input-label';

function LoginForm(props) {

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    function submit(e) {

        const url = "http://localhost:9000/login";
        const data = {
            username: username,
            password: password
        }

        fetch(url, {
            method: 'POST',
            mode: 'cors',
            credentials: 'include',
            body: JSON.stringify(data),
            headers: { 'Content-Type': 'application/json' }
        })
            .then(res => res.json())
            .then(res => console.log(res))
            .catch(err => console.log(err));

        e.preventDefault();

    }

    return <form action='/login' >
        <div className='label-div' ><Label label='Username' /></div>
        <input name='username' placeholder='Enter your username' type='text'
            onChange={(e) => {
                setUsername(e.target.value);
            }} required />

        <div className='label-div' ><Label label='Password' /></div>
        <input
            value={password}
            name='password' placeholder='Enter your password' type='text'
            onChange={(e) => {
                setPassword(e.target.value);
            }} required />
        <Button buttonText='LOGIN' onClick={submit} />
    </form>
}

export default LoginForm;