import React, { Component } from 'react';
import Header from './header/Header';

class Layout extends Component {
  render() {
    return (
      <div>
        <Header />
        <main id="main">
          <div className="main_container w-960 mg-auto clearfix">{ this.props.children }</div>
        </main>
      </div>
    );
  }
}

export default Layout;