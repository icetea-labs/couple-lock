import React, { Component } from 'react';
import { BrowserRouter as Router,Route, Switch} from 'react-router-dom';
import './resources/assets/sass/app.scss';
import './resources/assets/icomoon/icon.scss'
import Home from './resources/assets/components/Home';

class App extends Component {
  render() {
    return (
      <Router>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/propose/:id" component={Home} />
          {/* <Route exact path="/user/:id" component={User} /> */}
        </Switch>
      </Router>
    );
  }
}

export default App;
