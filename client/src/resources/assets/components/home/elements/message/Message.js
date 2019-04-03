import React, { Component } from 'react';
import { number, string, object } from 'prop-types';
import soketClientIO from 'socket.io-client';
import { connect } from 'react-redux';

export default class Message extends Component {
  constructor() {
    super();

    this.state = {
      possible: "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789",
      ramdom_id_message: "",
      messages: [],
      list_message: [],
      displayChat: []
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps !== this.props) {
      for (let i = 0; i < this.props.messages.length; i++) {
        if (this.props.messages[i].roomName === this.props.roomName) {
          this.state.list_message.push(this.props.messages[i]);
        }
        this.renderChat();
      }
    }
  }

  renderChat = () => {
    this.state.displayChat = this.state.list_message.map((item, index) => {
      return (
        <div key={index} id='my_message'>
          <span>{item.content}</span>
        </div>
      );
    })

    this.setState({
      list_message: []
    })
  }

//       arrayMessage.sort();

//       for (let i = 0; i < querySnapDocument.docs.length; i++) {
//         var sortMessage = messages.filter(
//           (value) => {
//             return value.timestamp === arrayMessage[i]
//           }
//         );
//         this.state.list_message.push(sortMessage[0]);
//       }

render() {
  return (
    <div>
      {
        this.state.displayChat
      }
    </div>
  )
}
}

// export default Message;