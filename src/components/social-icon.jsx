import React from 'react'

function SocialIcon(props) {
    return <span>
        <img
        alt={props.alt}
        className={props.className}
        src={props.src}
         />
    </span>

}

export default SocialIcon;