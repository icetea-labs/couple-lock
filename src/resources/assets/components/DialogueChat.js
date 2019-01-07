import React, { Component } from 'react';

class DialogueChat extends Component {
  constructor (props) {
    super(props);
    this.state = {
      post: [],
    }
  }

  componentDidMount() {
    fetch('https://5c2c6216ad36d90014f342b0.mockapi.io/api/v1/apiv1')
    .then(results => results.json())
    .then(data => this.setState({ post: data }))
  }


  render() {
    return (
      <div className="dialogue_chat mg-auto">
        <div className="box">
          <div className="title_time">
            <p><span className="icon-bed"></span>Lorem ipsum dolor sit amet</p>
            <span className="date">2/4/2004</span>
          </div>

          {
            this.state.post.length > 0 && this.state.post.map((item, index) => {
              const className = item.isClass ? 'chat_content' : 'chat_content -right';

              return (
                <div className={className} key={index}>
                  <div className="user_photo fl"><img src={item.avatar} alt="" /></div>
                  <div className="content_detail fl clearfix">
                    <span className="user_name color-violet" >{item.name}</span>
                    <span className="time fr color-grey">{item.dateTime}</span>
                    <p>{item.content}</p>
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