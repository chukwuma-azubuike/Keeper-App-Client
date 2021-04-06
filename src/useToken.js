import { useState } from 'react';

function useToken() {

    const getToken = () => {
        const tokenString = localStorage.getItem('token');//Get token
        const userToken = JSON.parse(tokenString);//Parse token
        return userToken
    }

    const [token, setToken] = useState(getToken());

    const saveToken = userToken => {
        localStorage.setItem('token', JSON.stringify(userToken))//Save token
        setToken(userToken)//Set token in state
    }

    return {
        setToken: saveToken,
        token: token
    }

}

export default useToken;