import React, { Component } from 'react';
import MainContent from './MainContent';
import Layout from './Layout';


class Home extends Component {
  render() {
    return (
      <Layout>
        <div className="home">
          <MainContent />
        </div>
      </Layout>
    );
  }
}

export default Home;