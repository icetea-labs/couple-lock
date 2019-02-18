import React, { Component } from 'react';
import axios from 'axios';

class BannerImage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      post: [],
      banner: null,
      loginUser: window.getLoginUser(),
    }
  }

  componentDidMount() {
    const {loginUser} = this.state;
    axios.get(`/api/propose/list?username=${loginUser}`)
    .then(res => { this.setState({ post: res.data.data }) }
    )
  }

  render() {
    const {loginUser} = this.state;
    return (
      <div>
        {
          this.state.post.length > 0 && this.state.post.map((item, index) => {
            const id = item.id;
            const proposeId = this.props.proposeId;
            return(
              (id === proposeId) && <div className="banner_container mg-auto" key={index}>
                <img src={item.s_attachments[0].url} alt="" />
                <p className="short_desc color-violet"><span className="icon-luggage"></span>
                  {item.s_attachments[0].caption}
                </p>
              </div>
            )
          })
        }
      </div>
    );
  }
}

export default BannerImage;