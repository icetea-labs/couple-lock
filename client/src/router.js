import React, { Component } from 'react';
import {Route} from 'react-router-dom';
import App from './App';


class routerURL extends Component {
  render() {
    return (
      <div>
        <Route exact path="/" component={App} />
        {/* <Route exact paht="/test" component={Test} /> */}
      </div>
    );
  }
}

export default routerURL;