import React, { Component } from 'react';
import moment from 'moment';

class RecentChat extends Component {
  constructor(props) {
    super(props);
    this.state = {
      para: [],
      userName: "tradatech",
    }
  }

  componentDidMount() {
    fetch('/api/propose/list?username=tradatech')
    .then(results => results.json())
    .then(data => this.setState({ para: data.data })
    )
  }

  renderBox = () => {
    if(this.state.userName === "tradatech"){
      return(
        <div>
          {
            this.state.para.length > 0 && this.state.para.map((item, index) => {
            let date = moment(item.s_timestamp).format("MM/DD/YYYY");
            return (
              <div className="box fl" key={index}>
                <div className="user_photo"><img src={item.s_attachments[0].url} alt="" /></div>
                <div className="content_detail fl clearfix">
                  <div className="name_time">
                    <span className="user_name color-violet">{item.sender}</span>
                    <span className="time fr color-grey">{date}</span>
                  </div>
                  <p>{item.s_message}</p>
                </div>
              </div>
              )
            })
          }
        </div>
      )
    }else{
      return(
        <div>
          {
            this.state.para.length > 0 && this.state.para.map((item, index) => {
            let date = moment(item.r_timestamp).format("MM/DD/YYYY");
            return (
              <div className="box fl" key={index}>
                <div className="user_photo"><img src={item.r_attachments[0].url} alt="" /></div>
                <div className="content_detail fl clearfix">
                  <div className="name_time">
                    <span className="user_name color-violet">{item.sender}</span>
                    <span className="time fr color-grey">{date}</span>
                  </div>
                  <p>{item.r_message}</p>
                </div>
              </div>
              )
            })
          }
        </div>
      )
    }
  }

  render() {
    return (
      <div className="Recentchat">
        <div className="Recentchat__container clearfix">
          { this.renderBox() }
        </div>
      </div>
    );
  }
}

export default RecentChat;