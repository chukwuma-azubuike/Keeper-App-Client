import Button from "./form-components/button";
import Label from './form-components/input-label';
import { useState } from "react";
import useToken from '../useToken';

function SignUpForm() {

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [field, setField] = useState('');
    const { setToken } = useToken();

    function validate() {
        if (password === confirmPassword) {
            return true
        }
    }

    function submit() {

        const url = 'https://keeper-app-02-api.herokuapp.com/signup'
        // const url = 'http://localhost:9000/signup';

        const data = {
            username: username,
            password: password
        }
        return fetch(url, {
            method: 'POST',
            mode: 'cors',
            credentials: 'include',
            body: JSON.stringify(data),
            headers: { 'Content-Type': 'application/json' }
        })
            .then(res => res.body)
            .then(body => {
                // console.log(body)
                const reader = body.getReader();
                reader.read().then(res => res.value)
                    .then(res => {
                        var string = new TextDecoder().decode(res) //Decode unitArray buffer
                        const data = JSON.parse(string); //Parse to convert to JSON 
                        console.log(data.message)
                        return data
                    })
                    .then(res => {
                        if (res.status === 'OK') {
                            console.log(res.token)
                            setToken(res.token) //Save token to browser local storage
                            return res.token
                        }
                    })
                    .catch(err => console.log(err))
            })
            .catch(err => console.log(err));
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        const derivedToken = await submit(username, password);
        console.log(derivedToken);
        window.location.reload(); //Force page to reload and render home
    }

    return <form action='/signup' onSubmit={validate && handleSubmit}>
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
        <Button buttonText='SIGN UP' />
    </form>
}

export default SignUpForm;