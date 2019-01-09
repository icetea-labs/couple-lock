import React, { Component } from 'react';
import Select from 'react-select';
import TagsInput from './TagsInput';

const options = [
  { value: 'Public', label: 'Public' },
  { value: 'Unlisted', label: 'Unlisted' },
  { value: 'Private', label: 'Private' }
];

class MemoryPost extends Component {
  constructor(props) {
    super (props);
    this.state ={
      selectedOption: { value: 'Public', label: 'Public' },
    }
  }

  handleChange = (selectedOption) => {
    this.setState({ selectedOption });
  }
  
  render() {
    const { selectedOption } = this.state;
    return (
      <div className="memorypost mg-auto">
        <div className="memorypost__content">
          <div className="post_container clearfix">
            <div className="user_avatar fl"><img src="./images/user-photo.jpg" alt="" /></div>
            <textarea className="post_input fl" placeholder="Describe your Memory…."></textarea>
          </div>
          <div className="custom_post">
            <div className="tags">
              {/* <p>TAGS: </p>
              <span className="color-violet">#honeymoon</span>
              <span className="color-violet">#travel</span> */}
              <TagsInput />
            </div>
            <div className="options">
              <div><span className="icon-location"></span></div>
              <div><span className="icon-photo"></span></div>
              <div><span className="icon-today"></span></div>
              <div><img src="./images/user-photo-women.jpg" alt="" /></div>
            </div>
          </div>
          <div className="action">
            <div className="privacy">
              <Select isSearchable={false} className="privacy_select" value={selectedOption} onChange={this.handleChange} options={options} />
            </div>
            <button type="button">Share</button>
          </div>
        </div>
      </div>
    );
  }
}

export default MemoryPost;