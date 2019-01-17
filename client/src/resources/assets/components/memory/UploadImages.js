import React, { Component } from 'react';
import axios from 'axios';

class UploadImages extends Component {
  constructor(props) {
    super(props);
    this.state = {selectedFile: null}
  }
  
  handleselectedFile = event => {
    this.setState({
      selectedFile: event.target.files[0],
    })
  }

  handleUpload = () => {
    const fd = new FormData();
    fd.append('images', this.state.selectedFile, this.state.selectedFile.name);
    axios.post('api/memory/create', fd)
    .then(res => {
      console.log(res);
    })
  }

  render() {
    return (
      <div className="upload_img">
        <input type="file" name="" id="" onChange={this.handleselectedFile} />
        <button onClick={this.handleUpload}>Upload</button>
      </div>
    );
  }
}

export default UploadImages;