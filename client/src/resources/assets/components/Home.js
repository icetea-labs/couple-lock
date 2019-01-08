import React, { Component } from 'react';
import Header from './Header';
import MainContent from './MainContent';

class Home extends Component {
  render() {
    return (
      <div className="home_page">
        <Header />
        <MainContent />
      </div>
    );
  }
}

export default Home;