import React, { Component } from 'react';
import axios from 'axios';

class BannerImage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      post: [],
      banner: null,
      currentUser: window.getLoginUser(),
    }
  }

  componentDidMount() {
    const {currentUser} = this.state;
    axios.get(`/api/propose/list?username=${currentUser}`)
    .then(res => { this.setState({ post: res.data.data }) }
    )
  }

  render() {
    return (
      <div>
        {
          this.state.post.length > 0 && this.state.post.map((item, index) => {
            const id = parseInt(item.id);
            const proposeId = parseInt(this.props.proposeId);
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