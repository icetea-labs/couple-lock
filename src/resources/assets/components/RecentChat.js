import React, { Component } from 'react';

class RecentChat extends Component {
  constructor(props) {
    super(props);
    this.state = {
      para: [],
    }
  }

  componentDidMount() {
    fetch('https://5c2c6216ad36d90014f342b0.mockapi.io/api/v1/apiv1?page=1&limit=2')
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

          {/* <div className="box fl">
            <div className="user_photo fl"><img src="./images/user-photo.jpg" alt="" /></div>
            <div className="content_detail fl clearfix">
              <span className="user_name color-violet">John Smith</span>
              <span className="time fr color-grey">12:02 3 May 2018</span>
              <p>In ultricies ipsum sem, in ullamcorper velit luctus sed. Fusce arcu ante, aliquet sit amet ornare quis, euismod ac justo. Duis hendrerit, lacus a facilisis congue,</p>
            </div>
          </div> */}

          {/* <div className="box fl">
            <div className="content_detail fl clearfix">
                <span className="time color-grey">12:02 3 May 2018</span>
                <span className="user_name fr color-violet">Mary William</span>
                <p>Duis hendrerit, lacus a facilisis congue,</p>
            </div>
            <div className="user_photo fl"><img src="./images/user-photo-women.jpg" alt="" /></div>
          </div> */}
        </div>
      </div>
    );
  }
}

export default RecentChat;