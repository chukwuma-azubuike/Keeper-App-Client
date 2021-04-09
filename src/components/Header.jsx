import React from "react";
import EnhancedEncryptionIcon from '@material-ui/icons/EnhancedEncryption';
// import logOutButton from './logOutButton';
import Logout from './logout';
import useToken from '../useToken';

function Header() {
  const { token } = useToken();

  return (
    <div>
      <header>
        <span><EnhancedEncryptionIcon /> Keeper</span>
        {token && <span><Logout /></span>}
      </header>
    </div>
  );
}

export default Header;
