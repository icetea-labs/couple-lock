import React, { Component } from 'react';

class RecentChat extends Component {
  constructor(props) {
    super(props);
    this.state = {
      para: [],
    }
  }

  componentDidMount() {
    fetch('/api/propose/1')
    .then(results => results.json())
    .then(data => this.setState({ para: data }))
  }

  render() {
    return (
      <div className="Recentchat">
        <div className="Recentchat__container clearfix">

        {
          this.state.para.length > 0 && this.state.para.map((item, index) => {
            const className = item.isClass ? 'box fl' : 'box fl -right';
            return (
              <div className={className} key={index}>
                <div className="user_photo"><img src={item.avatar} alt="" /></div>
                <div className="content_detail fl clearfix">
                  <div className="name_time">
                    <span className="user_name color-violet">{item.name}</span>
                    <span className="time fr color-grey">{item.dateTime}</span>
                  </div>
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

export default RecentChat;