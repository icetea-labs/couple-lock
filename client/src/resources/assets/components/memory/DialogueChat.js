import React, { Component } from 'react';
import moment from 'moment';
import axios from 'axios';

class DialogueChat extends Component {
  constructor (props) {
    super(props);
    this.state = {
      post: [],
    }
  }
  
  componentDidMount() {
    axios.get('/api/memory/list?proposeId=1')
    .then(res => {
      const dataSort = res.data.data.sort(function(a, b) { return b.timestamp - a.timestamp })
      this.setState({ post: dataSort });
    })
  }

  
  render() {
    const sender = this.props.sender;
    const receiver = this.props.receiver;
    return (
      <div className="dialogue_chat mg-auto">
        <div className="box">
          {
            this.state.post.length > 0 && this.state.post.map((item, index) => {
              const num = parseInt(item.timestamp);
              const date = moment(num).format("MM/DD/YYYY HH:mm");
              const className = (sender.username === item.sender) ? "sender" : "receiver";
              const avatar = (sender.username === item.sender) ? sender.avatar : receiver.avatar;
              const userName = (sender.username === item.sender) ? sender.username : item.sender;
              return (
                <div className="chat_content" key={index}>
                  <div className={className}>
                    <div className="user_photo fl"><img src={avatar} alt="" /></div>
                    <div className="content_detail fl clearfix">
                      <span className="user_name color-violet" >{userName}</span>
                      <span className="time fr color-grey">{date}</span>
                      <p>{item.message}</p>
                    </div>
                  </div>
                </div>
              )
            })
          }
        </div>
      </div>
    );
  }
}

export default DialogueChat;