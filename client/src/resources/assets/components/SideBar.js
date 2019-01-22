import React, { Component } from 'react';
import axios from 'axios';


class SideBar extends Component {
  constructor (props) {
    super(props);
    this.state = {
      listUser: [],
    }
  }

  componentDidMount(){
    axios.get('/api/user/details?username=tradatech')
    .then(res => {
      this.setState({
        listUser : res.data.data
      })
    })
  }
  
  render() {
    return (
      <div className="sidebar">
        <div className="sidebar__item">
          <div className="sidebar__item__avatar">
            <img src={ this.state.listUser.avatar } alt=""/>
          </div>
          <div className="sidebar__item__detail">
            <div className="sidebar__item__detail__username color-violet">{ this.state.listUser.username }</div>
            {/* <div className="sidebar__item__detail__chat">This is also awesome!</div> */}
          </div>
        </div>
      </div>

    );
  }
}

export default SideBar;