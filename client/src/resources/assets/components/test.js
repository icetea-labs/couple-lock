import React, { Component } from 'react';

class test extends Component {
  constructor(props) {
    super(props);
    this.state = {
      leftUser: [],
      rightUser: [],
      propose: []
    };
  }
  
  getUsers(sender, receiver) {
    const p1 = fetch("/api/user/details?username=" + sender);
    const p2 = fetch("/api/user/details?username=" + receiver);
    Promise.all([p1, p2])
    .then(([res1, res2]) => Promise.all([res1.json(), res2.json()]))
    .then(([u1, u2]) => {
      const currentUser = window.getLoginUser();
      this.setState({
        leftUser: (currentUser === u1.data.username) ? u1.data : u2.data,
        rightUser: (currentUser !== u1.data.username) ? u1.data : u2.data
      });
    });
  }

  componentDidMount() {
      fetch("/api/propose/details?id=0")
      .then(resp => resp.json())
      .then(propose => {
        this.getUsers(propose.data.sender, propose.data.receiver)
      });
  }
  
  render() {
    console.log(this.state.leftUser);
    return (
      <div>
        
      </div>
    );
  }
}

export default test;