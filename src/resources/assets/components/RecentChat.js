import React, { Component } from 'react';

class RecentChat extends Component {
  render() {
    return (
      <div className="Recentchat">
        <div className="Recentchat__container clearfix">
          <div className="box fl">
            <div className="user_photo fl"><img src="./images/user-photo.jpg" alt="" /></div>
            <div className="content_detail fl clearfix">
              <span className="user_name color-violet">John Smith</span>
              <span className="time fr color-grey">12:02 3 May 2018</span>
              <p>In ultricies ipsum sem, in ullamcorper velit luctus sed. Fusce arcu ante, aliquet sit amet ornare quis, euismod ac justo. Duis hendrerit, lacus a facilisis congue,</p>
            </div>
          </div>
          <div className="box fl">
            <div className="content_detail fl clearfix">
                <span className="time color-grey">12:02 3 May 2018</span>
                <span className="user_name fr color-violet">Mary William</span>
                <p>Duis hendrerit, lacus a facilisis congue,</p>
            </div>
            <div className="user_photo fl"><img src="./images/user-photo-women.jpg" alt="" /></div>
          </div>
        </div>
      </div>
    );
  }
}

export default RecentChat;