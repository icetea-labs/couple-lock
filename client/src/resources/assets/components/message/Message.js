import React, {Component} from 'react';
import firebase from 'firebase';
import Config from '../firebase/Config';
import PubSub from 'pubsub-js';
import { number, string, object } from 'prop-types';

export default class Message extends Component {
  render() {
    return (
      <div className="message">
      </div>
    )
  }
}