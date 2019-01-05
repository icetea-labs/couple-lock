import React, { Component } from 'react';

class MemoryPost extends Component {
  render() {
    return (
      <div className="memorypost mg-auto">
        <div className="memorypost__content">
          <div className="post_container clearfix">
            <div className="user_avatar fl"><img src="./images/user-photo.jpg" alt="" /></div>
            <textarea className="post_input fl" placeholder="Describe your Memory…."></textarea>
          </div>
          <div className="custom_post">
            <div className="tags">
              <p>TAGS:</p>
              <span className="color-violet">#honeymoon</span>
              <span className="color-violet">#travel</span>
            </div>
            <div className="options">
              <div><span className="icon-location"></span></div>
              <div><span className="icon-photo"></span></div>
              <div><span className="icon-today"></span></div>
              <div><img src="./images/user-photo-women.jpg" alt="" /></div>
            </div>
          </div>
          <div className="action">
            <div className="privacy">
              <select>
                <option>Pulic</option>
                <option>Unlisted</option>
                <option>Private</option>
              </select>
            </div>
            <button type="button">Share</button>
          </div>
        </div>
      </div>
    );
  }
}

export default MemoryPost;