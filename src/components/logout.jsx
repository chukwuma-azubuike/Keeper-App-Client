import React from 'react';
import userToken from '../useToken';
import { BrowserRouter as Link } from 'react-router-dom';

function Logout(props) {
    const { logout } = userToken();
    return (
        <button
            type='button'
            onClick={() => {
                logout();
                return <Link to='/' />
            }}>
            Logout
        </button>
    )
}
export default Logout;