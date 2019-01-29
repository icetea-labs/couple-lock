import React, { Component } from 'react';
import Select from 'react-select';
import TagsInput from './TagsInput';
import LocationSearchInput from './Places';
import axios from 'axios';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import moment from 'moment';

const options = [
  { value: 'Public', label: 'Public' },
  { value: 'Unlisted', label: 'Unlisted' },
  { value: 'Private', label: 'Private' }
];

class MemoryPost extends Component {
  constructor() {
    super ();
    this.state ={
      selectedOption: { value: 'Public', label: 'Public' },
      isPlace : false,
      m_message: '',
      selectFile: null,
      startDate: new Date(),
    }
  }

  // showInputPlaces = () => {
  //   if(this.state.isPlace) {
  //     document.addEventListener('click', this.handleOutslideClick, false)
  //   }else {
  //     document.removeEventListener('click', this.handleOutslideClick, false)
  //   }
  //   this.setState( prevState => ({
  //     isPlace : !prevState.isPlace
  //   }));
  // }

  // handleOutslideClick = (e) => {
  //   if (this.node.contains(e.target)) {
  //     return;
  //   }
  //   this.showInputPlaces();
  // }

  setPrivacyMemory = (selectedOption) => {
    this.setState({ selectedOption });
  }
  
  getMessageValue = (e) => {
    this.setState({
      m_message: e.target.value ,
    })
  }

  fileSelected = e => {
    const img = {
      imgUpload: e.target.files[0],
      imgPreview: URL.createObjectURL(e.target.files[0]),
    }
    this.setState({
      selectFile: img ,
    })
  }

  getDate = (date) => {
    this.setState({
      startDate: date
    });
    console.log(this.state.startDate);
  }
  shareMemory = (e) => {
    e.preventDefault();
    const sender = window.getLoginUser();
    const dateFormat = moment(this.state.startDate * 1000).unix();
    const formData = new FormData();
    formData.append('proposeId', 0);
    formData.append('message', this.state.m_message);
    formData.append('sender', sender);
    formData.append('timestamp', dateFormat);
    formData.append('attachment', this.state.selectFile.imgUpload);

    axios.post('/api/memory/create', formData)
    .then(res => {
      console.log(res);
      console.log(res.data);
      window.location.reload();
    })
  }

  isImagePreview = () =>{
    if(this.state.selectFile){
      return this.state.selectFile.imgPreview || "";
    }
  }
  
  isEnabledShare = () => {
    const { m_message, selectFile } = this.state;
    if(m_message.length > 0 || selectFile != null){
      return "false" ;
    }
  }

  render() {
    const { selectedOption } = this.state;
    return (
      <div className="memorypost mg-auto">
        <div className="memorypost__content">
          <div className="post_container clearfix">
            <div className="user_avatar fl"><img src={this.props.sender.avatar} alt="" /></div>
            <textarea className="post_input fl" placeholder="Describe your Memory…." onChange={ this.getMessageValue }></textarea>
          </div>
          <div className="custom_post">
            <div className="tags">
              <TagsInput />
            </div>
            <div className="options">
              <div className="place-wrapper" ref={node => { this.node = node }}>
                <span className="icon-location" onClick={ this.showInputPlaces }></span>
                {
                  this.state.isPlace && <LocationSearchInput />
                }
              </div>
              <div className="upload_img">
                <span className="icon-photo"></span>
                <input type="file" accept="image/*" onChange={ this.fileSelected }/>
              </div>
              <div><span className="icon-today"></span><DatePicker selected={this.state.startDate} onChange={this.getDate} /></div>
              <div><img src={this.props.receiver.avatar} alt="" /></div>
            </div>
          </div>
          <div className="img_preview"><img src={ this.isImagePreview() } alt="" /></div>
          <div className="action">
            <div className="privacy">
              <Select isSearchable={false} className="privacy_select" value={selectedOption} onChange={this.setPrivacyMemory} options={options} />
            </div>
            <button type="button" disabled={! this.isEnabledShare()} onClick={ this.shareMemory }>Share</button>
          </div>
        </div>
      </div>
    );
  }
}

export default MemoryPost;