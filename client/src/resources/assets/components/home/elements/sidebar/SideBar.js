import React, { Component } from 'react';
import axios from 'axios';
import PubSub from 'pubsub-js';
import ReceiverPromises from './ReceiverPromises';
import AddPromise from './AddPromise';
import PopularTag from './PopularTag';
import SentPromises from './SentPromises';
import { connect } from 'react-redux';
import DeniedPromises from './DeniedPromises';

const mapStatetoProps = (state) => ({
  ...state.handleBanner
})

const mapDispatchToProps = (dispatch) => ({
  addBanner: (data) => dispatch({
      type: 'ADD_BANNER',
      proposeId: data.proposeId,
      img_sender: data.img_sender,
      img_receiver: data.img_receiver,
      sender: data.sender,
      receiver: data.receiver
  })
})

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
      receiverPromises: [],
      deniedPromises: [],
      sentPromises: [],
      show_friend: false,
      show_promise: false,
      avatarUrl: localStorage.getItem("I_U"),
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
    PubSub.subscribe('updatePromise', () => {
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
    const receiverPromises = [];
    const sentPromises = [];
    const deniedPromises = [];

    data.forEach((obj) => {
      pId.push(obj.proposeId);
      this.props.getProposeId(pId[0]);
      PubSub.publish('proposeIdTags', pId[0])
      if ((loginUser === obj.sender || loginUser === obj.receiver) && obj.r_react === 1) {
        acceptPromises.push(obj);
      }
      if ((loginUser === obj.receiver) && obj.r_react === undefined){
        receiverPromises.push(obj);
      }
      if ((loginUser === obj.sender) && obj.r_react === undefined) {
        sentPromises.push(obj);
      }
      if ((loginUser === obj.receiver) && obj.r_react === 2){
        deniedPromises.push(obj);
      }
    });

    PubSub.publish('deniedPromise', [...receiverPromises])

    this.setState({
      acceptPromises: [...acceptPromises],
      receiverPromises: [...receiverPromises],
      sentPromises: [...sentPromises],
      deniedPromises: [...deniedPromises],
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
          viewed: p.viewed,
        }
      } else {
        sidebarItems[p.sender] = {
          proposeId: p.id,
          sender: p.sender,
          receiver: p.receiver,
          r_react: p.r_react,
          viewed: p.viewed,
          s_attachments: p.s_attachments,
          s_message: p.s_message,
          s_key: p.s_key,
          visibility: p.visibility,
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
      const res = Object.keys(obj).map(function (key, index) {
        return {
          proposeId: obj[key].proposeId,
          sender: obj[key].sender,
          receiver: obj[key].receiver,
          viewed: obj[key].viewed,
          r_react: obj[key].r_react,
          avatar: obj[key].user.avatar,
          username: obj[key].user.username,
          displayName: obj[key].user.displayName,
          s_message: obj[key].s_message,
          s_key: obj[key].s_key,
          visibility: obj[key].visibility,
          s_attachments: obj[key].s_attachments
        }
      })
      this.setState({ data: res });
      this.getPromises();

    }
  }

  passingProposeId = (pId) => {
    this.setState({ activeUserId: pId })
    this.props.proposeIdChanged(pId);

    Promise.all([axios.get('/api/propose/details?id='+ pId)])
      .then(([res]) => {
        let data = res.data.data;
        if( data.r_attachments.length  !== 0) {
          var img_receiver = data.r_attachments[0].url
        }

        if( data.s_attachments.length  !== 0) {
          var img_sender = data.s_attachments[0].url
        }

        const dataBanner = {
          pId,
          img_sender: img_sender,
          img_receiver: img_receiver,
          sender: res.data.data.sender,
          receiver: res.data.data.receiver
        }

        this.props.addBanner(dataBanner);
      });
    PubSub.publish('proposeIdChangeTags', pId)
  }

  render() {
    const { acceptPromises,receiverPromises, sentPromises, deniedPromises } = this.state;
    //console.log(sentPromises);
    return (
      <div className="sidebar">

        {/* Chose friend */}
        <AddPromise sender={window.getLoginUser()} />

        {/* Show list Accepted Promise */}
        {acceptPromises.length > 0 && <h3 className="title title_promise">Accepted promise</h3>}
        {
          acceptPromises.length > 0 && acceptPromises.map((item, index) => {
            const { activeUserId } = this.state;
            const className = (activeUserId === item.proposeId) ? 'sidebar__item activeUser' : 'sidebar__item';
            return (
              <div className={className} key={index} onClick={() => this.passingProposeId(item.proposeId)} id={item.proposeId}>
                <div className="sidebar__item__avatar"><img src={item.avatar} alt="" /></div>
                <div className="sidebar__item__detail">
                  <div className="sidebar__item__detail__displayname">{item.displayName}</div>
                  <div className="sidebar__item__detail__username">@{item.username}</div>
                </div>
              </div>
            )
          })
        }
        <ReceiverPromises receiverPromises={receiverPromises}/>
        <SentPromises sentPromises={sentPromises}/>
        <DeniedPromises deniedPromises={deniedPromises} />
        <PopularTag />
      </div>
    );
  }
}

export default connect(mapStatetoProps, mapDispatchToProps)(SideBar);