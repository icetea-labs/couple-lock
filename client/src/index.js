import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import redux from 'redux';
// import 'font-awesome/css/font-awesome.min.css';

window.getLoginUser = () => {
  if (localStorage.getItem("sender") === null) {
    return 'sotatek'
  } else {
    return localStorage.getItem("sender");
  }
};

var test = {
  name: 'ok',
  age: '21'
}

var test1 = {...test}

test1.name= '12'

// console.log(
//   test, '+', test1
// );

ReactDOM.render(
  <App />, document.getElementById('root')
);

serviceWorker.unregister();
