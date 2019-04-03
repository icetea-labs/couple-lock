import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import SearchBox from './SearchBox';
import UserAccount from './UserAccount';
import Notification from './Notification';
// import Settings from './Settings';
// import LogOut from './LogOut';
import Exflore from './Exflore';
import PeoPle from './People';

class Header extends Component {


  render() {
    return (
      <div id="header">
        <div className="header__container w-960">
          <div className="logo"><Link to="/"><img src="./images/heart-logo.svg" alt="" /><span>LoveLock</span></Link></div>
          <SearchBox />
          <Exflore />
          <PeoPle />
          <UserAccount />
          <Notification />
          {/* <Settings /> */}
          {/* <LogOut /> */}
        </div>
      </div>
    );
  }
}

export default Header;