import React, { Component } from 'react';

class UserAccount extends Component {

  constructor(props) {
    super(props)

    this.state = ({
      img_url: localStorage.getItem("img_url"),
      img_default: "./images/user-photo.jpg",
      avatar: "",
      linkto: "",
      redirect: "/login"
    })
  }

  componentWillMount() {
    if (localStorage.getItem("img_url") !== null) {
      this.setState({
        avatar: this.state.img_url,
        linkto: localStorage.getItem("name"),
        redirect: "/profile/user",
      })
    } else {
      this.setState({
        avatar: this.state.img_default,
        linkto: "Create Account",
      })
    }
  }

  render() {
    return (
      <div className="custom-right-header">
        <div className="user">
          <span className="user__photo"><img src={this.state.avatar} alt="" /></span>
          <button className="login__button"><a href={this.state.redirect}>{this.state.linkto}</a></button>
        </div>
      </div>
    );
  }
}

export default UserAccount;