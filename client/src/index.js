import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import reducer from './reducers/reducer';
import socketIOClient from 'socket.io-client';

window.getLoginUser = () => {
  if (localStorage.getItem("sender") === null) {
    return 'sotatek'
  } else {
    return localStorage.getItem("sender");
  }
};

const socket = socketIOClient('localhost:5000');

console.log(socket);

/**
 * create storage
 */
const store = createStore(
  reducer,socket,window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());

// const store = configureStore();
// store.dispatch(actions.setTracks(tracks));

ReactDOM.render((
  <Provider store={store}>
    <App />
  </Provider>
), document.getElementById('root')
);

serviceWorker.unregister();
