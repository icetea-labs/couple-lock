import React, { Component } from 'react';

class BannerImage extends Component {
  render() {
    return (
      <div className="banner_container mg-auto">
        <img src="./images/banner.jpg" alt="" />
        <p className="short_desc color-violet"><span className="icon-luggage"></span>Lorem ipsum dolor sit amet, consectetur adipiscing elit. In facilisis sollicitudin ultricies.</p>
      </div>
    );
  }
}

export default BannerImage;