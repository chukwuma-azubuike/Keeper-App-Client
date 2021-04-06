import React from "react";
import EnhancedEncryptionIcon from '@material-ui/icons/EnhancedEncryption';
// import logOutButton from './logOutButton';

function Header() {
  return (
    <div>
      <header>
        <h1><EnhancedEncryptionIcon /> Keeper</h1>
      </header>
      {/* <logOutButton
        buttonText='Logout'
        type='button'
        className='logout-button'
      /> */}
    </div>
  );
}

export default Header;
