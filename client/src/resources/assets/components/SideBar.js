import React, { Component } from 'react';
// import { Link } from 'react-router-dom';
import axios from 'axios';


class SideBar extends Component {
  constructor (props) {
    super(props);
    this.state = {
      listUser: [],
      proId: [],
    }
  }

  componentDidMount(){
    Promise.all([
      axios.get('/api/user/all'),
      axios.get('/api/propose/list?username=sotatek')
    ])
    .then(([res1, res2]) =>  this.setState({
        listUser: res1.data.data, 
        proId: res2.data.data,
      })
    );
      
    // axios.get('/api/propose/list?username=sotatek')
    // .then(res => {
    //   this.setState({
    //     listUser : res.data.data
    //   })
    // })
  }
  
  // pageReload = (e) => {
  //   e.preventDefault();
  //   window.location.reload();
  // }

  render() {
    const data = this.state.listUser.concat(this.state.proId);
    return (
      <div className="sidebar">
        {
         data.length > 0 && data.map((item, index) =>{
            return (
              <div>
                id: {item.id} <br/>
                avatar: <img src={item.avatar} alt="" />
                name: {item.username}
              </div>
            )
          })
        }
      </div>
    );
  }
}

export default SideBar;