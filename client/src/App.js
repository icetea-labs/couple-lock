import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import './resources/assets/sass/app.scss';
import './resources/assets/icomoon/icon.scss';
import './resources/assets/sass/profile.scss'
import './resources/assets/sass/login.scss';
import './resources/assets/sass/seed.scss';
import './resources/assets/sass/chatbox.scss';
import './resources/assets/sass/addpromise.scss';
import './resources/assets/sass/list_friend.scss';
import Home from './resources/assets/components/Home';
import Login from './resources/assets/components/Login';
import Profile from './resources/assets/components/Profile';
import SeedPhase from './resources/assets/components/SeedPhase';
import User from './resources/assets/components/User';

class App extends Component {
  render() {
    return (
      <Router>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/login/profile" component={Profile} />
          <Route exact path="/login/seed" component={SeedPhase} />
          <Route exact path="/profile/user" component={User} />
        </Switch>
      </Router>

    );
  }
}

export default App;
