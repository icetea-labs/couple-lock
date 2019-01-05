import React, { Component } from 'react';
import { BrowserRouter as Router, Link} from 'react-router-dom';
import './resources/assets/sass/app.scss';
import './resources/assets/icomoon/icon.scss'
import SearchBox from './resources/assets/components/SearchBox';

class App extends Component {
  render() {
    return (
      <Router>
        <div>
          <div id="header">
            <div className="header__container w-960">
              <div className="logo"><Link to="/"><img src="./images/heart-logo.svg" alt="Couple Lock" /><span>LoveLock</span></Link></div>
              <SearchBox />
            </div>
          </div>
          <div id="main"></div>
          <div id="footer"></div>
        </div>
      </Router>
    );
  }
}

export default App;
