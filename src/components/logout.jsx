import React, { useState } from 'react';
import userToken from '../useToken';

function Logout(props) {
    const { logout } = userToken();
    const [hover, setHover] = useState(false);

    return (
        <span className='logout-span'>
            <a className='logout' href='/' onClick={() => {
                logout();
            }}
                onMouseOver={() => {
                    setHover(true);
                }}
                onMouseOut={() => {
                    setHover(false);
                }}
                style={{ color: hover ? '#fff' : '#ee849f' }}>Logout</a>
        </span>
    )
}
export default Logout;