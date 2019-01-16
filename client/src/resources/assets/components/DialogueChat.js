import React, { Component } from 'react';
import moment from 'moment';

class DialogueChat extends Component {
  constructor (props) {
    super(props);
    this.state = {
      post: [],
    }
  }
  
  componentDidMount() {
    fetch('/api/memory/list?proposeId=0')
    .then(results => results.json())
    .then(data => this.setState({ post: data.data })
    )
  }

  
  render() {
    
    const sender = this.props.sender
    
    console.log(sender);
    
    return (
      <div className="dialogue_chat mg-auto">
        <div className="box">
          {
            this.state.post.length > 0 && this.state.post.map((item, index) => {
              let date = moment(item.timestamp).format("MM/DD/YYYY");
              return (
                <div className="chat_content" key={index}>
                  <div className="left_mes">
                    <div className="user_photo fl"><img src="" alt="" /></div>
                    <div className="content_detail fl clearfix">
                      <span className="user_name color-violet" >{item.sender}</span>
                      <span className="time fr color-grey">{date}</span>
                      <p>{item.s_message}</p>
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