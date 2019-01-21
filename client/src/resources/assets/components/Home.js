import React, { Component } from 'react';
import Header from './header/Header';
import MainContent from './MainContent';


class Home extends Component {
  render() {
    return (
      <div className="home">
        <Header />
        
        <MainContent />
      </div>
    );
  }
}

export default Home;