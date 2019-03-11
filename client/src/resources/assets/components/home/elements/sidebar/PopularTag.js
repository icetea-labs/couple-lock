import React, { Component } from 'react';

class PopularTag extends Component {
  render() {
    return (
      <div className="popular_tags">
        <h3 className="title title_promises">Popular Tag</h3>
        <div className="popular_tags__list">
          <ul>
            <li><span>#love</span></li>
            <li><span>#travel</span></li>
            <li><span>#honeymoon</span></li>
            <li><span>#relax</span></li>
            <li><span>#sweet</span></li>
          </ul>
        </div>
      </div>
    );
  }
}

export default PopularTag;