import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
// import 'font-awesome/css/font-awesome.min.css';

window.getLoginUser = () => {
  if (localStorage.getItem("sender") === null) {
    return 'sotatek'
  } else {
    return localStorage.getItem("sender");
  }
};



ReactDOM.render(
  <App />, document.getElementById('root')
);

serviceWorker.unregister();
