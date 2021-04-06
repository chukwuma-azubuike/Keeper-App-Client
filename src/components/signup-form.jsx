import Button from "./form-components/button";
import Label from './form-components/input-label';
import { useState } from "react";
import { BrowserRouter as Redirect } from 'react-router-dom'

function SignUpForm() {

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [field, setField] = useState('');

    function validate(props) {
        if (password === confirmPassword) {
            return true
        }
    }

    function submit(e) {

        e.preventDefault()

        const url = 'http://localhost:9000/signup'

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
                        console.log(data.status)
                        // alert(data.message)
                        return data.status
                    })
                    .then(res => {
                        if (res === 'OK') {
                            return <Redirect to='/home' />
                        }
                    })
                    .catch(err => console.log(err))
            })
            .catch(err => console.log(err));
    }

    return <form action='/signup' onSubmit={validate && submit}>
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

        <div className='label-div' ><Label label='Confirm Password' /></div>
        <input
            value={confirmPassword}
            style={{ outlineWidth: 1, outlineColor: !field ? '#F72514' : '#85d67b' }}
            name='password'
            placeholder='Enter your password again'
            type='password'
            onChange={(e) => {
                setConfirmPassword(e.target.value);
                password === e.target.value ? setField(true) : setField(false)
            }} required />
        <Button buttonText='SIGN UP' onClick={submit} />
    </form>
}

export default SignUpForm;