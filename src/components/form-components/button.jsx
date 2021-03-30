import React, { useState } from 'react'

function Button(props) {

    const [color, setColor] = useState(false);

    // function handleSubmit() {
    //     return props.validate(true)
    // }

    return <button
        onClick={props.onClick}
        type={props.type}
        onMouseOver={() => {
            setColor(true)
        }}
        onMouseOut={() => {
            setColor(false)
        }}
        className={!color ? 'mouse-out' : 'mouse-over'} >{props.buttonText}</button>
}

export default Button;