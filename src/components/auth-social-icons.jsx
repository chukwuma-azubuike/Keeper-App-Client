import React from 'react';
import facebookImg from './images/facebook.png'
import twitterImg from './images/twitter.png'
import googlePlusImg from './images/google-plus.png'
import gitHubImg from './images/github.png'
import SocialIcon from "./social-icon";


function AuthSocialIcons() {

    return <div>
        <SocialIcon
            src={facebookImg}
            className='social-icon'
        // link={}
        />
        <SocialIcon
            src={twitterImg}
            className='social-icon'
        // link={}
        />
        <SocialIcon
            src={googlePlusImg}
            className='social-icon'
        // link={}
        />
        <SocialIcon
            src={gitHubImg}
            className='social-icon'
        // link={}
        />
    </div>
}

export default AuthSocialIcons;