import React, { Component } from 'react';
import { BrowserRouter as Router,Route, Switch} from 'react-router-dom';
import './resources/assets/sass/app.scss';
import './resources/assets/icomoon/icon.scss'
import Home from './resources/assets/components/Home';
import SideBar from './resources/assets/components/SideBar';

class App extends Component {
  render() {
    return (
      <Router>
        <Switch>
          <Route exact path="/" component={SideBar} />
          <Route exact path="/propose/:id" component={Home} />
        </Switch>
      </Router>
    );
  }
}

export default App;
