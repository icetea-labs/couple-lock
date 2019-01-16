import React, { Component } from 'react';
import BannerImage from './BannerImage';
import MemoryPost from './MemoryPost';
import DialogueChat from './DialogueChat';
import RecentChat from './RecentChat';

class MainContent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      leftUser: [],
      rightUser: [],
      proposeList: [],
      memory: [],
      userName: [],
    };
  }

  getUsers(sender, receiver) {
    const p1 = fetch("/api/user/details?username=" + sender);
    const p2 = fetch("/api/user/details?username=" + receiver);
    Promise.all([p1, p2])
    .then(([res1, res2]) => Promise.all([res1.json(), res2.json()]))
    .then(([u1, u2]) => {
      const currentUser = window.getLoginUser();
      this.setState({
        leftUser: (currentUser === u1.data.username) ? u1.data : u2.data,
        rightUser: (currentUser !== u1.data.username) ? u1.data : u2.data,
      });
    });
  }

  componentDidMount() {
    fetch("/api/propose/details?id=0")
    .then(resp => resp.json())
    .then(propose => {
      this.getUsers(propose.data.sender, propose.data.receiver);
      this.setState({ proposeList: propose.data });
    });
}

  render() {
    // console.log(this.state.rightUser);
    return (
      <div id="main">
        <div className="main__container">
          <div className="main__container-top w-960 mg-auto">
            <BannerImage />
            <RecentChat mes={this.state.proposeList} sender={this.state.leftUser} receiver={this.state.rightUser}/>
          </div>
          <div className="main__container-center w-960 mg-auto">
            <MemoryPost />
            <DialogueChat sender={this.state.leftUser}/>
          </div>
        </div>
      </div>
    );
  }
}

export default MainContent;