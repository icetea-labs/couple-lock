import React, { Component } from 'react';
import axios from 'axios';
import PubSub from 'pubsub-js';
import Promises from './Promises';
import AddPropose from './AddPropose';
import PopularTag from './PopularTag';
import SentPromises from './SentPromises';

class SideBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      activeUserId: null,
      user: {},
      r_react: null,
      loginUser: window.getLoginUser(),
      acceptPromises: [],
      deniedPromises: [],
      sentPromises: [],
      show_friend: false,
      show_promise: false,
      avatarUrl: localStorage.getItem("I_U"),
      test: [],
    }
  }

  componentDidMount() {
    this.fetchData();
  }

  fetchData = () => {
    const { loginUser } = this.state;
    Promise.all([
      axios.get('/api/user/all'),
      axios.get(`/api/propose/list?username=${loginUser}`)
    ])
      .then(([res1, res2]) => {
        this.getUsers(res1.data.data, res2.data.data)
      });
  }

  componentWillMount() {
    PubSub.subscribe('acceptPromise', () => {
      this.fetchData();
    });
    PubSub.subscribe('sendPromise', () => {
      this.fetchData();
    });
  }

  getPromises = () => {
    const { data } = this.state;
    const { loginUser } = this.state;
    let pId = [];
    const acceptPromises = [];
    const deniedPromises = [];
    const sentPromises = [];

    data.forEach((obj) => {
      pId.push(obj.proposeId);
      this.props.getProposeId(pId[0]);
      if ((loginUser === obj.sender || loginUser === obj.receiver) && obj.r_react === 1) {
        acceptPromises.push(obj);
      }
      if ((loginUser === obj.receiver) && obj.r_react === undefined){
        deniedPromises.push(obj);
      }
      if ((loginUser === obj.sender) && obj.r_react === undefined){
        sentPromises.push(obj);
      }
    });

    this.setState({
      acceptPromises: [...acceptPromises],
      deniedPromises: [...deniedPromises],
      sentPromises: [...sentPromises],
    });
  }

  extractUserInfo = (username, allUser) => {
    return allUser.find((u) => u.username === username);
  }

  getUsers = (allUser, listPropose) => {
    const userLogin = window.getLoginUser();
    const sidebarItems = [];

    listPropose.forEach((p, index) => {
      if (index === 0) {
        this.setState({ activeUserId: p.id });
      }
      if (p.sender === userLogin) {
        sidebarItems[p.receiver] = {
          proposeId: p.id,
          sender: p.sender,
          receiver: p.receiver,
          r_react: p.r_react,
          viewed: p.viewed
        }
      } else {
        sidebarItems[p.sender] = {
          proposeId: p.id,
          sender: p.sender,
          receiver: p.receiver,
          r_react: p.r_react,
          viewed: p.viewed
        }
      }
      this.setState({
        user: {
          sender: p.sender,
          receiver: p.receiver,
        },
      });
    });

    Object.keys(sidebarItems).forEach((key) => {
      sidebarItems[key].user = allUser.find(u => u.username === key);
    })
    this.setState({ sidebarItems });
    this.getUserInfo();
  }

  getUserInfo = () => {
    const obj = this.state.sidebarItems;
    if (obj) {
      // console.log(obj);
      const res = Object.keys(obj).map(function (key, index) {
        return {
          proposeId: obj[key].proposeId,
          sender: obj[key].sender,
          receiver: obj[key].receiver,
          viewed:  obj[key].viewed,
          r_react: obj[key].r_react,
          avatar: obj[key].user.avatar,
          username: obj[key].user.username,
          displayName: obj[key].user.displayName,
        }
      })
      this.setState({ data: res });
      this.getPromises();

    }
  }

  passingProposeId = pId => {
    this.setState({ activeUserId: pId })
    this.props.proposeIdChanged(pId);
  }
  
  render() {
    const { acceptPromises,deniedPromises, sentPromises } = this.state;
    //console.log(sentPromises);
    return (
      <div className="sidebar">

        {/* Chose friend */}
        <AddPropose sender={window.getLoginUser()} />

        {/* Show list Accepted Promise */}
        {acceptPromises.length > 0 && <h3 className="title title_promise">Accepted promise</h3>}
        {
          acceptPromises.length > 0 && acceptPromises.map((item, index) => {
            const { activeUserId } = this.state;
            const className = (activeUserId === item.proposeId) ? 'sidebar__item activeUser' : 'sidebar__item';
            return (
              <div className={className} pid={item.proposeId} key={index} onClick={() => this.passingProposeId(item.proposeId)}>
                <div className="sidebar__item__avatar"><img src={item.avatar} alt="" /></div>
                <div className="sidebar__item__detail">
                  <div className="sidebar__item__detail__displayname">{item.displayName}</div>
                  <div className="sidebar__item__detail__username">@{item.username}</div>
                </div>
              </div>
            )
          })
        }
        {/* End Show list Accepted Promise */}
        <Promises deniedPromises={deniedPromises} />
        <SentPromises sentPromises={sentPromises}/>
        <PopularTag />
      </div>
    );
  }
}

export default SideBar;