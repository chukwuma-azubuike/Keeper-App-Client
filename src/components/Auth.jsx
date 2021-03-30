import React, { useState } from 'react';
import FormControl from '@material-ui/core/FormControl';

function Auth() {

    return (
        <div>
            <h1>Login</h1>

            <FormControl>
                <InputLabel htmlFor="my-input">Email address</InputLabel>
                <Input id="my-input" aria-describedby="my-helper-text" />
                <FormHelperText id="my-helper-text">We'll never share your email.</FormHelperText>
                <h1>Login</h1>
            </FormControl>
        </div>
    )
}
export default Auth;