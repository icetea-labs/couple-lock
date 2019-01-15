import React, { Component } from 'react';

class BannerImage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      post: [],
    }
  }

  componentDidMount() {
    fetch('/api/propose/list?username=tradatech')
    .then(results => results.json())
    .then(data => this.setState({ post: data.data }))
  }

  render() {
    return (
      <div className="banner_container mg-auto">
         {
          this.state.post.length > 0 && this.state.post.map((item, index) => {
          // const className = item.isClass ? 'box fl' : 'box fl -right';
          return (
            <div className="banner_container mg-auto" key={index}>
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