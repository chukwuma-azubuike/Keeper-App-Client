import Button from "./form-components/button";
import Label from './form-components/input-label';
import { useState } from "react";


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
            .then(console.log(data))
            .then(res => res.json())
            .then(res => console.log(res))
            .catch(err => console.log(err));

        e.preventDefault()
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
            name='password' placeholder='Enter your password' type='text'
            onChange={(e) => {
                setPassword(e.target.value);
            }} required />

        <div className='label-div' ><Label label='Confirm Password' /></div>
        <input
            value={confirmPassword}
            style={{ outlineWidth: 1, outlineColor: !field ? '#F72514' : '#85d67b' }}
            name='password'
            placeholder='Enter your password again'
            type='text'
            onChange={(e) => {
                setConfirmPassword(e.target.value);
                password === e.target.value ? setField(true) : setField(false)
            }} required />
        <Button buttonText='SIGN UP' onClick={submit} />
    </form>
}

export default SignUpForm;