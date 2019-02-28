import React, { Component } from 'react';
import firebase from 'firebase';
import Config from '../firebase/Config';
import PubSub from 'pubsub-js';
import { number, string, object } from 'prop-types';

export default class Message extends Component {

  constructor(props) {
    super(props);

    this.state = {
      possible: "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789",
      ramdom_id_message: "",
      messages: [],
      list_message: [],
    }

    this.displayChat = [];
  }


  componentWillMount() {
    this.fetchDataMessage();
  }

  // componentDidMount(){
  //   this.fetchDataMessage();
  // }


  fetchDataMessage = () => {

    var arrayMessage = [];
    var messages = [];
    firebase.firestore()
      .collection("chat_data_bases")
      .doc("couple")
      .collection("chat_rooms")
      .doc("chat_room_1")
      .collection("messages")
      .get().then((querySnapDocument) => {
        querySnapDocument.forEach(
          (doc) => {
            messages.push(doc.data());
            arrayMessage.push(doc.data().timestamp);
          });

        arrayMessage.sort();

        for (let i = 0; i < querySnapDocument.docs.length; i++) {
          var sortMessage = messages.filter(
            (value) => {
              return value.timestamp === arrayMessage[i]
            }
          );
          this.state.list_message.push(sortMessage[0]);
        }

        for (let i = 0; i < querySnapDocument.docs.length; i++) {
          this.displayChat.push(
            <div key={this.state.list_message[i].id} id="my_message">
              <span>{this.state.list_message[i].content}</span>
            </div>);
        }
      })
    // console.log('all mess', messages);
    // console.log('sorted', arrayMessage);
    // console.log('list', this.state.list_message);
  }

  emitSend() {
    for (let i = 0; i < 20; i++) {
      this.state.ramdom_id_message += this.state.possible.charAt(Math.floor(Math.random() * 20));
    }

    firebase.firestore()
      .collection("chat_data_bases")
      .doc("couple")
      .collection("chat_rooms")
      .doc("chat_room_1")
      .collection("messages")
      .doc(this.state.ramdom_id_message).set({
        content: this.state.message_input,
        owner: this.state.id,
        timestamp: Date.now(),
        id: this.state.ramdom_id_message,
      });
    // TODO: Reload database in message
  }

  render() {
    return (
      <div>
        {
          this.displayChat
        }
      </div>
    )
  }
}