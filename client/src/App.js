import React, { Component } from 'react';
import { BrowserRouter as Router,Route, Switch} from 'react-router-dom';
import './resources/assets/sass/app.scss';
import './resources/assets/icomoon/icon.scss'
import Home from './resources/assets/components/Home';
import Login from './resources/assets/components/Login';
import Profile from './resources/assets/components/Profile';
import Seed from './resources/assets/components/Seed';

class App extends Component {
  render() {
    return (
      <Router>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path= "/login" component={Login}/>
          <Route exact path="/login/profile" component = {Profile}/>
          <Route exact path="/login/seed" component = {Seed} />
        </Switch>
      </Router>
    );
  }
}

export default App;
