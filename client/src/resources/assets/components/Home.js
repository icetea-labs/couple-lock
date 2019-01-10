import React, { Component } from 'react';
import Header from './Header';
import MainContent from './MainContent';
import LocationSearchInput from './Places';

class Home extends Component {
  render() {
    return (
      <div className="home_page">
        <Header />
        <LocationSearchInput />
        <MainContent />
      </div>
    );
  }
}

export default Home;