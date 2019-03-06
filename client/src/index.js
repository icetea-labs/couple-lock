import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import reducer from './reducers/reducer';
import todos from './reducers/todo';

window.getLoginUser = () => {
  if (localStorage.getItem("sender") === null) {
    return 'sotatek'
  } else {
    return localStorage.getItem("sender");
  }
};
const list_friend = [
  { id: 1, name: 'Paula' },
  { id: 2, name: 'Annie' },
  { id: 3, name: 'Richard' }
]

/**
 * create storage
 */
const store = createStore(
  reducer
  , list_friend
  , window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());

// const store = configureStore();
// store.dispatch(actions.setTracks(tracks));

ReactDOM.render((
  <Provider store={store}>
    <App />
  </Provider>
), document.getElementById('root')
);

serviceWorker.unregister();
