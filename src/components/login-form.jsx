import React, { useState } from 'react';
import Button from "./form-components/button";
import Label from './form-components/input-label';
import { BrowserRouter, Link, Redirect, Route } from 'react-router-dom';
import Home from './home';

function LoginForm(props) {

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [routeStatus, setRouteStatus] = useState(false);

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
            .then(res => res.body)
            .then(body => {
                const reader = body.getReader();
                reader.read().then(res => res.value)
                    .then(res => {
                        var string = new TextDecoder().decode(res) //Decode unitArray buffer
                        const data = JSON.parse(string); //Parse to convert to JSON 
                        return data.status;
                    })
                    .then(res => {
                        console.log(res)
                        if (res === 'OK') {
                            console.log(res)
                            setRouteStatus(true)
                            // console.log(routeStatus)
                        }
                    })
                    .then(console.log(routeStatus))
                    .catch(err => console.log(err))
            })
            .catch(err => console.log(err));

        e.preventDefault();

    }

    if (routeStatus) {
        alert(routeStatus)
        return <Redirect to='/home' />;
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
            name='password' placeholder='Enter your password' type='password'
            onChange={(e) => {
                setPassword(e.target.value);
            }} required />
        <Button buttonText='LOGIN' onClick={submit} />
    </form>
}

export default LoginForm;