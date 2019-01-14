import React, { Component } from 'react';
import BannerImage from './BannerImage';
// import RecentChat from './RecentChat';
import MemoryPost from './MemoryPost';
import DialogueChat from './DialogueChat';

class MainContent extends Component {
  render() {
    return (
      <div id="main">
        <div className="main__container">
          <div className="main__container-top w-960 mg-auto">
            <BannerImage />
            {/* <RecentChat /> */}
          </div>
          <div className="main__container-center w-960 mg-auto">
            <MemoryPost />
            <DialogueChat />
          </div>
        </div>
      </div>
    );
  }
}

export default MainContent;