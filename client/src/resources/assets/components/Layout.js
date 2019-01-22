import React, { Component } from 'react';
import Header from './header/Header';
import SideBar from './SideBar';

class Layout extends Component {
  render() {
    return (
      <div>
        <Header />
        <SideBar />
        <main id="main_container">
          <div className="wrapper">{ this.props.children }</div>
        </main>
      </div>
    );
  }
}

export default Layout;