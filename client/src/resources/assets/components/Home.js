import React, { Component } from 'react';
import axios from 'axios';
import Layout from './Layout';
import BannerImage from './propose/BannerImage';
import MemoryPost from './memory/MemoryPost';
import DialogueChat from './memory/DialogueChat';
import RecentChat from './propose/RecentChat';
import SideBar from './SideBar';
import ChatBox from './message/ChatBox';


class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      leftUser: [],
      rightUser: [],
      proposeList: [],
      userName: [],
      proposeId: null,
    }
  }

  getProposeId = (pId) => {
    this.setState({
      proposeId: pId,
    })
  }

  proposeIdChanged = (newProposeId) => {
    this.setState({
      proposeId: newProposeId,
    })
  }

  
  getUsers = (sender, receiver) => {
    const {proposeId} = this.state;
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
  
  fetchProposeId = () =>{
    const proposeId = this.state.proposeId;
    if(proposeId !== null){
      axios.get(`/api/propose/details?id=${proposeId}`)
      .then(propose => {
        this.getUsers(propose.data.data.sender, propose.data.data.receiver);
        this.setState({ proposeList: propose.data.data });
      })
    }
  }
  
  componentDidMount() {
    this.fetchProposeId();
  }

  componentDidUpdate(prevProps, prevState) {
    const pId = this.state.proposeId;
    if(pId !== prevState.proposeId){
      this.fetchProposeId();
    }
  }
  
  render() {
    return (
      <Layout>
        <div>
            <div className="propose">
              <BannerImage mes={this.state.proposeList} sender={this.state.leftUser} receiver={this.state.rightUser} proposeId={this.state.proposeId} />
              <RecentChat propose={this.state.proposeList} sender={this.state.leftUser} receiver={this.state.rightUser}/>
            </div>

            <div className="memory">
              <div className="col-left fl">
                <SideBar proposeIdChanged={this.proposeIdChanged} sender={this.state.leftUser} receiver={this.state.rightUser} getProposeId={this.getProposeId}/>
              </div>
              <div className="col-right fr">
                <MemoryPost sender={this.state.leftUser} receiver={this.state.rightUser} proposeId={this.state.proposeId}/>
                <DialogueChat sender={this.state.leftUser} receiver={this.state.rightUser} proposeId={this.state.proposeId}/>
              </div>
            </div>
            <ChatBox></ChatBox>
        </div>
      </Layout>
    );
  }
}

export default Home;