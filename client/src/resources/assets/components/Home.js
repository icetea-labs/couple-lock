import React, { Component } from 'react';
import axios from 'axios';
import Layout from './Layout';
import BannerImage from './propose/BannerImage';
import MemoryPost from './memory/MemoryPost';
import DialogueChat from './memory/DialogueChat';
import RecentChat from './propose/RecentChat';
import SideBar from './SideBar';


class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      leftUser: [],
      rightUser: [],
      proposeList: [],
      userName: [],
      // proposeId: this.props.match.params.id,
    }
  }

  proposeIdChanged = (newProposeId) => {
    this.setState({
      proposeId: newProposeId
    })
  }

  componentDidMount() {
    // const pid = this.state.proposeId;
    // axios.get(`/api/propose/details?id=${pid}`)
    axios.get('/api/propose/details?id=0')
    .then(propose => {
      this.getUsers(propose.data.data.sender, propose.data.data.receiver);
      this.setState({ proposeList: propose.data.data });
    })
  }

  getUsers = (sender, receiver) => {
    const p1 = axios.get("/api/user/details?username=" + sender);
    const p2 = axios.get("/api/user/details?username=" + receiver);
    Promise.all([p1, p2])
    .then(([u1, u2]) => {
      const currentUser = window.getLoginUser();
      this.setState({
        leftUser: (currentUser === u1.data.data.username) ? u1.data.data : u2.data.data,
        rightUser: (currentUser !== u1.data.data.username) ? u1.data.data : u2.data.data,
      });
    });
  }

  
  render() {
    return (
      <Layout>
        <div>
          
            <div className="propose">
              <BannerImage mes={this.state.proposeList} sender={this.state.leftUser} receiver={this.state.rightUser}/>
              <RecentChat mes={this.state.proposeList} sender={this.state.leftUser} receiver={this.state.rightUser}/>
            </div>

            <div className="memory">
              <div className="col-left fl">
                <SideBar />
              </div>
              <div className="col-right fr">
                <MemoryPost sender={this.state.leftUser} receiver={this.state.rightUser}/>
                <DialogueChat sender={this.state.leftUser} receiver={this.state.rightUser} pid={this.state.proposeId} proposeId={this.state.proposeId}/>
              </div>
            </div>
            
        </div>
      </Layout>
    );
  }
}

export default Home;