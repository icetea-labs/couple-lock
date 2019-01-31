import React, { Component } from 'react';
import {Route} from 'react-router-dom';
import App from './App';

class routerURL extends Component {
  render() {
    return (
      <div>
        <Route exact path="/" component={App} />
      </div>
    );
  }
}

export default routerURL;