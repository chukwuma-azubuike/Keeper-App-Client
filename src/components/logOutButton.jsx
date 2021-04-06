import React from 'react'

function logOutButton(props) {
    alert(props.buttonText)
    return (
        <button
            logOut={props.logOut}
            type={props.type}
            className={props.className}
        >{props.buttonText}</button>
    );
}

export default logOutButton;