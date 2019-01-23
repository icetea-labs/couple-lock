import React, { Component } from 'react';

class UserAccount extends Component {
  render() {
    return (
      <div className="custom-right-header">
        <div className="user">
          <span className="user__photo"><img src="./images/user-photo.jpg" alt="" /></span>
          <button className="login__button"><a href="/login">Login</a></button>
        </div>

        <div className="explore">
          <div className="explore__box">Explore</div>
          <span className="explore__icon icon-expand-more"></span>
        </div>
      </div>
    );
  }
}

export default UserAccount;