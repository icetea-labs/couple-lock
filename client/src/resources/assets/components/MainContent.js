import React, { Component } from 'react';
// import BannerImage from './BannerImage';
// import RecentChat from './RecentChat';
// import MemoryPost from './MemoryPost';
import DialogueChat from './DialogueChat';

class MainContent extends Component {

  constructor (props) {
    super(props);
    this.state = {
      post: [],
    }
  }

  componentDidMount() {
    fetch('/api/memory/list?proposeId=0')
    .then(results => results.json())
    .then(data => this.setState({ post: data.data }))
  }
  
  render() {
    return (
      <div id="main">
        <div className="main__container">
          {
            this.state.post.length > 0 && this.state.post.map((item, index) => {
              return (
                <DialogueChat x={item} key={index} />
              )
            })
          }
          {/* <div className="main__container-top w-960 mg-auto">
              <BannerImage />
              <RecentChat />
          </div>
          <div className="main__container-center w-960 mg-auto">
            <MemoryPost />
            <DialogueChat />
          </div> */}
        </div>
      </div>
    );
  }
}

export default MainContent;