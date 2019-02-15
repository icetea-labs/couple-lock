import React, { Component } from 'react';
import moment from 'moment';

class RecentChat extends Component {

  constructor(props){
    super(props);
    this.state = {
      loginUser: window.getLoginUser(),
    }
  }

  render() {
    const {loginUser} = this.state;
    const leftTime = moment(this.props.s_timestamp).format("MM/DD/YYYY");
    const rightTime = moment(this.props.r_timestamp).format("MM/DD/YYYY");
    return (
      <div className="Recentchat">
        <div className="Recentchat__container clearfix">
          <div className="box fl">
            <div className="user_photo"><img src={this.props.sender.avatar} alt="" /></div>
            <div className="content_detail fl clearfix">
              <div className="name_time">
                <span className="user_name color-violet">{this.props.sender.username}</span>
                <span className="time fr color-grey">{leftTime}</span>
              </div>
              {
                (loginUser === this.props.propose.sender) ? <p>{this.props.propose.s_message}</p> : <p>{this.props.propose.r_message}</p>
              }
            </div>
          </div>

          <div className="box fr">
            <div className="user_photo"><img src={this.props.receiver.avatar} alt="" /></div>
            <div className="content_detail fl clearfix">
              <div className="name_time">
                <span className="time fr color-grey">{rightTime}</span>
                <span className="user_name color-violet">{this.props.receiver.username}</span>
              </div>
              {
                (loginUser !== this.props.propose.sender) ? <p>{this.props.propose.s_message}</p> : <p>{this.props.propose.r_message}</p>
              }
            </div>
          </div>

        </div>
      </div>
    );
  }
}

export default RecentChat;