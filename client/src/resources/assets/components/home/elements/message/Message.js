import React, { Component } from 'react';

export default class Message extends Component {
  constructor(props) {
    super(props);

    this.state = {
      possible: "abcdefghijklmnopqrstuvwxyz0123456789",
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

      let show_img = true;
      let id = 'friend_message';
      if (this.props.owner === item.username) {
        id = 'my_message';
        show_img = false;
      }

      return (
        <div className="message">
          <div className="avatar">
          </div>
          <div key={item.id} id={id}>
            <span>{item.content}</span>
          </div>
        </div>

      );
    })

    this.setState({
      list_message: []
    })
  }

  render() {
    return (

      <div className="content_message">
        {
          this.state.displayChat
        }
      </div>
    )
  }
}

// export default Message;