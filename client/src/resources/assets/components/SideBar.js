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
    const login = "sotatek";
    const sidebarItems = {};
    listPropose.forEach(p => {
      if (p.sender === login) {
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

  getAll= () => {
    const obj = this.state.sidebarItems;
    if(obj){
      Object.keys(obj).forEach(function(key) {
        console.log(key);
      });
    }
  }

  render() {
    return (
      <div className="sidebar">
        {this.getAll()}
      </div>
    );
  }
}

export default SideBar;