import React, { Component } from 'react';
import axios from 'axios';


class SideBar extends Component {
  constructor (props) {
    super(props);
    this.state = {
      // listUser: [],
      // proUser: [],
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
    this.setState({sidebarItems})
  }

  getUserInfo= () => {
    const obj = this.state.sidebarItems;
    if(obj){
     return(
      Object.keys(obj).map(function(key, index) {
        return  <div className="sidebar__item" key={index}>
          <div className="sidebar__item__avatar"><img src={obj[key].user.avatar} alt="" /></div>
          <div className="sidebar__item__detail">
            <div className="sidebar__item__detail__displayname">{obj[key].user.displayName}</div>
            <div className="sidebar__item__detail__username">{obj[key].user.username}</div>
          </div>
        </div>
      })
     )
    }
  }
    
  render() {
    return (
      <div className="sidebar">
        <button type="button" className="btn_add_promise"><span className="icon-ic-add"></span>Add Promise</button>
        <h3 className="title_promise">Accepted promise</h3>
        {this.getUserInfo()}
      </div>
    );
  }
}

export default SideBar;