import React, { Component } from 'react';
import axios from 'axios';
import { Modal, Button } from 'react-bootstrap';
import MaterialIcon, { colorPalette } from 'material-icons-react';

class SideBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      activeUserId: null,
      show_friend: false,
      show_promise: false,
      avatarUrl: localStorage.getItem("I_U")
    }

    this.handleShowListFriend = this.handleShowListFriend.bind(this);
    this.handleShowToProMise = this.handleShowToProMise.bind(this);
    this.handleClose = this.handleClose.bind(this);

  }

  handleClose() {
    this.setState({
      show_friend: false,
      show_promise: false,
    });
  }

  handleShowListFriend() {
    this.setState({
      show_friend: true
    });
  }

  handleShowToProMise() {
    this.setState({
      show_promise: true
    })
  }


  componentDidMount() {
    const userLogin = window.getLoginUser();
    Promise.all([
      axios.get('/api/user/all'),
      axios.get(`/api/propose/list?username=${userLogin}`)
    ])
      .then(([res1, res2]) => {
        this.getUsers(res1.data.data, res2.data.data)
      });
  }

  extractUserInfo = (username, allUser) => {
    return allUser.find((u) => u.username === username);
  }

  getUsers = (allUser, listPropose) => {
    const userLogin = window.getLoginUser();
    const sidebarItems = {};

    listPropose.forEach((p, index) => {
      if (index === 0) {
        this.state.activeUserId = p.id;
      }
      if (p.sender === userLogin) {
        sidebarItems[p.receiver] = {
          proposeId: p.id
        }
      } else {
        sidebarItems[p.sender] = {
          proposeId: p.id
        }
      }
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
          avatar: obj[key].user.avatar,
          username: obj[key].user.username,
          displayName: obj[key].user.displayName,
        }
      })
      this.setState({ data: res })
    }
  }
  passingProposeId = pId => {
    this.setState({ activeUserId: pId })
    this.props.proposeIdChanged(pId);
  }
  render() {
    const { data } = this.state;

    return (

      <div className="sidebar">

        <button type="button" className="btn_add_promise" onClick={this.handleShowListFriend}><span className="icon-ic-add"></span>Add Promise</button>
        {/* Chose friend */}
        <Modal className="add_friend" show={this.state.show_friend} onHide={this.handleClose} >
          <Modal.Header >
            <button className="btn_close" onClick={this.handleClose}>X</button>
            <Modal.Title><h4>Propose</h4></Modal.Title>
          </Modal.Header>
          <hr></hr>
          <Modal.Body>
            <input placeholder="Search..." />
          </Modal.Body>
          <Modal.Footer>
            <Button className="btn_next" onClick={this.handleShowToProMise}>Next</Button>
          </Modal.Footer>
        </Modal>

        {/* Add propose */}
        <Modal className="add_promise" show={this.state.show_promise} onHide={this.handleClose} >
          <Modal.Header >
            <Modal.Title><h4>Add Memory</h4></Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div >
              <div className="describe">
                <div className="avatar">
                  <div class="my-avatar">
                    <img id="my_avatar" src={this.state.avatarUrl} />
                  </div>
                </div>
                <div className="text_memory">
                  <textarea name="" id="" rows="3" placeholder="Describe your Memory..."></textarea>
                </div>
              </div>
              <div class="tag_friend">
                <div class="tag">
                  <input type="text" class="input-tag" placeholder="TAGS:    #honeymoon #travel" />
                </div>
                <div class="to-avatar">
                  <MaterialIcon />
                  <div class="friend-avatar">
                    <img class="image_friend" src="http://pluspng.com/img-png/github-octocat-logo-vector-png--896.jpg" alt="" />
                  </div>
                  <div>
                    <i class="material-icons col">&#xe24f;</i>
                  </div>
                </div>
              </div>
            </div>
            <div class="add_more">
              <span class="more-infor">
                <i class="material-icons">&#xe432;</i>
                <p>Photo</p>
              </span>
              <span class="more-infor">
                <i class="material-icons">&#xe55f;</i>
                <p>Check-in</p>
              </span>
              <span class="more-infor">
                <p>Public</p>
                <i class="material-icons">arrow_drop_down</i>
              </span>
            </div>
          </Modal.Body>
          <Modal.Footer>
            <Button className="button-send" onClick={this.handleClose}>send</Button>
          </Modal.Footer>
        </Modal >

        <h3 className="title_promise">Accepted promise</h3>
        {
          data.length > 0 && data.map((item, index) => {
            const { activeUserId } = this.state;
            const className = (activeUserId === item.proposeId) ? 'sidebar__item activeUser' : 'sidebar__item';
            return (
              <div className={className} pid={item.proposeId} key={index} onClick={() => this.passingProposeId(item.proposeId)}>
                <div className="sidebar__item__avatar"><img src={item.avatar} alt="" /></div>
                <div className="sidebar__item__detail">
                  <div className="sidebar__item__detail__displayname">{item.displayName}</div>
                  <div className="sidebar__item__detail__username">{item.username}</div>
                </div>
              </div>
            )
          })
        }
      </div >
    );
  }
}

export default SideBar;