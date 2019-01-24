import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';


class SideBar extends Component {
  constructor (props) {
    super(props);
    this.state = {
      listUser: [],
    }
  }

  componentDidMount(){
    axios.get('/api/propose/list?username=sotatek')
    .then(res => {
      this.setState({
        listUser : res.data.data
      })
    })
  }
  
  pageReload = (e) => {
    e.preventDefault();
    window.location.reload();
  }

  render() {
    return (
      <div className="sidebar">
        {
          this.state.listUser.length > 0 && this.state.listUser.map((item, index) =>{
            return(
              <div className="sidebar__item" key={index}>
                <Link push="true" to={`/propose/${item.id}`} onClick={()=>this.pageReload()}>proposeId: {item.id}</Link>
              </div>
            )
          })
        }
      </div>
    );
  }
}

export default SideBar;