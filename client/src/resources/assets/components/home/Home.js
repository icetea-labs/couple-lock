import React, { Component } from 'react';
import axios from 'axios';
import PubSub from 'pubsub-js';
import { connect } from 'react-redux';


// Element
import Layout from './Layout';
import BannerImage from './elements/propose/BannerImage';
import MemoryPost from './elements/memory/MemoryPost';
import DialogueChat from './elements/memory/DialogueChat';
import RecentChat from './elements/propose/RecentChat';
import SideBar from './elements/sidebar/SideBar';
import ChatBox from './elements/message/ChatBox';
import FriendList from './elements/friendlist/FriendList';
import ChangUser from '../helper/ChangeUser';
import PopUp from './elements/popup/PopUp';

const mapStateToProps = (state) => ({...state.initListFriend});

const mapDispatchToProps = (dispatch) => ({
   closeThis : (username) => dispatch({
        type: 'DELETE_FRIEND',
        username
    })
})

class Home extends Component {
  constructor() {
    super();
    this.state = {
      leftUser: [],
      rightUser: [],
      proposeList: [],
      userName: [],
      proposeId: null,
      max_chat: 3,
      test: process.env.MONGO_DB_URI,
    }

    this.listChat = [];
  }

  getProposeId = pId => {
    this.setState({ proposeId: pId, })
  }

  proposeIdChanged = newProposeId => {
    this.setState({ proposeId: newProposeId })
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

  fetchProposeId = () => {
    const { proposeId } = this.state;
    if (proposeId !== null) {
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

  componentWillMount() {
    // console.log(this.props)
    PubSub.subscribe('shareMemory', () => {
      this.fetchProposeId();
    });
    PubSub.subscribe('refreshProposeDetail', () => {
      const { proposeId } = this.state;
      if (proposeId !== null) {
        axios.get(`/api/propose/details?id=${proposeId}`)
          .then(propose => {
            this.setState({ proposeList: propose.data.data });
          })
      }
    });
  }

  componentDidUpdate(prevProps, prevState) {
    const pId = this.state.proposeId;
    if (pId !== prevState.proposeId) {
      this.fetchProposeId();
    }
  }

  render() {
    return (
      <Layout>
        <div>
          <div className="propose">
            <BannerImage mes={this.state.proposeList} sender={this.state.leftUser} receiver={this.state.rightUser} proposeId={this.state.proposeId} />
            <RecentChat propose={this.state.proposeList} sender={this.state.leftUser} receiver={this.state.rightUser} />
          </div>

          <div className="memory">
            <div className="col-left fl">
              <SideBar proposeIdChanged={this.proposeIdChanged} sender={this.state.leftUser} receiver={this.state.rightUser} getProposeId={this.getProposeId} />
            </div>
            <div className="col-right fr">
              <MemoryPost sender={this.state.leftUser} receiver={this.state.rightUser} proposeId={this.state.proposeId} />
              <DialogueChat sender={this.state.leftUser} receiver={this.state.rightUser} proposeId={this.state.proposeId} />
            </div>
          </div>
          <div className="list_chatbox">
            {
              this.listChat
            }
          </div>
          <FriendList />
          <ChangUser />
          <PopUp />
        </div>
        <ChatBox />
      </Layout >
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);