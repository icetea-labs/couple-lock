import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { connect } from 'react-redux';
import MaterialIcon, { autorenew } from 'material-icons-react';

// scss
import './resources/assets/sass/home/app.scss';
import './resources/assets/icomoon/icon.scss';
import './resources/assets/sass/profile.scss'
import './resources/assets/sass/login.scss';
import './resources/assets/sass/seed.scss';
import './resources/assets/sass/home/chatbox.scss';
import './resources/assets/sass/home/addpromise.scss';
import './resources/assets/sass/home/list_friend.scss';
import './resources/assets/sass/home/notification.scss';
import './resources/assets/sass/user.scss';
import './resources/assets/sass/home/settings.scss';
import './resources/assets/sass/home/popup.scss';
import './resources/assets/sass/home/logout.scss';
import './resources/assets/sass/newfeed/newfeed.scss';
import './resources/assets/sass/home/newfeed.scss';


// page router
import NewFedd from './resources/assets/components/new-feed/NewFeed';
import Home from './resources/assets/components/home/Home';
import Login from './resources/assets/components/sign-up/Login';
import Profile from './resources/assets/components/set-profile/Profile';
import SeedPhase from './resources/assets/components/create-account/SeedPhase';
import User from './resources/assets/components/user/User';
import Test from './resources/assets/components/Test';

const mapStateToProps = (state) => {
  return {
    ...state
  }
}

const mapDispatchToProps = (state) => {
  return {
    ...state
  }
}

class App extends Component {
  state = {
    loading: true
  }

  componentWillMount = () => {
  }

  componentDidMount = () => {
    demoAsyncCall().then(() => this.setState({ loading: false }));
  }

  render() {
    const { loading } = this.state

    if (loading) { // if your component doesn't have to wait for an async action, remove this block 
      return (<div className="loading">
        <div className="gif">
          <img src="./images/loading.gif" alt="loading" />
        </div>
      </div>); // render null when app is not ready
    }

    return (
      <Router>
        <Switch>
          <Route exact path='/' component={Home} />
          <Route exact path='/newfeed' component={NewFedd} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/login/profile" component={Profile} />
          <Route exact path="/login/seed" component={SeedPhase} />
          <Route exact path="/profile/user" component={User} />
          <Route exact path="/test" component={Test} />
        </Switch>
      </Router>

    );
  }
}

function demoAsyncCall() {
  return new Promise((resolve) => setTimeout(() => resolve(), 1000));
}


export default connect(mapStateToProps, mapDispatchToProps)(App);
