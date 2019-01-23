import React, { Component } from 'react';
import { BrowserRouter as Router,Route, Switch} from 'react-router-dom';
import './resources/assets/sass/app.scss';
import './resources/assets/icomoon/icon.scss'
import Home from './resources/assets/components/Home';
import Login from './resources/assets/components/Login';

class App extends Component {
  render() {
    return (
      <Router>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path= "/login" component={Login}/>
        </Switch>
      </Router>
    );
  }
}

export default App;
