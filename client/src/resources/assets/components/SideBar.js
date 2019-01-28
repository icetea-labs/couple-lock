import React, { Component } from 'react';
import axios from 'axios';


class SideBar extends Component {
  constructor (props) {
    super(props);
    this.state = {
      data: [],
    }
  }

  componentDidMount(){
    Promise.all([
      axios.get('/api/user/all'),
      axios.get('/api/propose/list?username=sotatek')
    ])
    .then(([res1, res2]) =>  {
      this.getUsers(res1.data.data, res2.data.data)
    });
  }

  extractUserInfo = (username, allUser) => {
    return allUser.find((u) => u.username === username);
  }

  getUsers = (allUser, listPropose) => {
    const userLogin = window.getLoginUser();
    const sidebarItems = {};
    listPropose.forEach(p => {
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
    this.setState({sidebarItems});
    this.getUserInfo();
  }

  getUserInfo = () => {
    const obj = this.state.sidebarItems;
    if(obj){
      const res = Object.keys(obj).map(function(key, index) {
        return { 
          proposeId: obj[key].proposeId,
          avatar:  obj[key].user.avatar,
          username:  obj[key].user.username,
          displayName:  obj[key].user.displayName,
        }
      })
      this.setState({ data: res})
    }
  }
  passingProposeId = pId =>{
    this.props.proposeIdChanged(pId);
  }
  render() {
    const data = this.state.data;
    return (
      <div className="sidebar">
        {
          data.length > 0 && data.map((item, index) =>{
            return(
              <div className="sidebar__item" key={index} onClick={() => this.passingProposeId(item.proposeId)}>
                <div className="sidebar__item__avatar"><img src={item.avatar} alt="" /></div>
                <div className="sidebar__item__detail">
                <div className="sidebar__item__detail__displayname">{item.displayName}</div>
                <div className="sidebar__item__detail__username">{item.username}</div>
                </div>
              </div>
            )
          })
        }
      </div>
    );
  }
}

export default SideBar;