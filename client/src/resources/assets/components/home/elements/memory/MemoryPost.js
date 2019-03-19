import React, { Component } from 'react';
import Select from 'react-select';
import TagsInput from './TagsInput';
import LocationSearchInput from './Places';
import axios from 'axios';
import PubSub from 'pubsub-js';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import moment from 'moment';
// import socketIOClient from 'socket.io-client';

const options = [
  { value: 'Public', label: 'Public' },
  { value: 'Unlisted', label: 'Unlisted' },
  { value: 'Private', label: 'Private' }
];

class MemoryPost extends Component {
  constructor() {
    super();
    this.state = {
      selectedOption: { value: 'Public', label: 'Public' },
      idVisible: null,
      isPlace: false,
      m_message: '',
      selectFile: null,
      startDate: new Date(),
      openPicker: false,
      location: '',
      tags: [],
      key: null,
    }
  }

  showInputPlaces = () => {
    this.setState(prevState => ({
      isPlace: !prevState.isPlace
    }));
  }

  handleOutslideClick = (e) => {
    if (this.node.contains(e.target)) {
      return;
    }
    this.showInputPlaces();
  }

  setPrivacyMemory = selectedOption => {
    this.setState({ selectedOption });
  }

  getIdVisible() {
    const id = this.state.selectedOption.value;
    if (id === "Public") {
      return 1;
    } else if (id === "Unlisted") {
      return 2;
    }
    else {
      return 3;
    }

  }

  getMessageValue = (e) => {
    this.setState({
      m_message: e.target.value,
    })
  }

  fileSelected = e => {
    const img = {
      imgUpload: e.target.files[0],
      imgPreview: URL.createObjectURL(e.target.files[0]),
    }
    this.setState({
      selectFile: img,
    })
  }

  getDate = (date) => {
    this.setState({
      startDate: date,
      openPicker: !this.state.openPicker,
    });
  }

  getTags = (arr) => {
    const tags = [];
    arr.forEach(item => {
      tags.push(item.text)
    });
    const listTag = tags.join(';')
    this.setState({ tags: listTag });
  }

  shareMemory = (e) => {
    e.preventDefault();
    const {m_message, selectFile, location, tags , key} = this.state;
    // console.log(tags);
    const sender = window.getLoginUser();
    const visibility = this.getIdVisible();
    const dateFormat = moment(this.state.startDate * 1000).unix();
    const formData = new FormData();
    const proposeId = this.props.proposeId;
    // TODO: create randomkey
    if (visibility === 3){
      // generate new key
    }
    formData.append('proposeId', proposeId);
    formData.append('visibility', visibility);
    // TODO: add random key
    formData.append('key', key);
    formData.append('message', m_message);
    formData.append('sender', sender);
    formData.append('timestamp', dateFormat);
    formData.append('attachment', (selectFile) ? selectFile.imgUpload : null);
    formData.append('tags', tags);
    formData.append('locationName', location);
    formData.append('locationLat', 10);
    formData.append('locationLong', 10);

    axios.post('/api/memory/create', formData)
    .then(res => {
      // console.log(res);
      // console.log(res.data);
      PubSub.publish('shareMemory');
    })

    this.setState({
      m_message: "",
      selectFile: null,
      location: "",
      startDate: new Date(),
    });

    // const socket = socketIOClient(this.state.host);
    // socket.emit('createNoti', this.state.receiver);
  }

  toggleOpenPicker = () => {
    this.setState({ openPicker: !this.state.openPicker })
  }

  isImagePreview = () => {
    if (this.state.selectFile) {
      return this.state.selectFile.imgPreview;
    }
  }

  isEnabledShare = () => {
    const { m_message, selectFile } = this.state;
    if (m_message.length > 0 || selectFile != null) {
      return "false";
    }
  }

  getLocation = add => {
    this.setState({ location: add });
  }

  render() {
    const { selectedOption, startDate } = this.state;
    const currentDate = moment(this.state.startDate).format("MM/DD/YYYY");
    const selectDate = moment(Date.now()).format("MM/DD/YYYY");
    return (
      <div className="memorypost mg-auto">
        <div className="memorypost__content">
          <div className="post_container clearfix">
            <div className="user_avatar fl"><img src={this.props.sender.avatar} alt="" /></div>
            <textarea className="post_input fl" placeholder="Describe your Memory…." onChange={this.getMessageValue} value={this.state.m_message}></textarea>
            {
              (this.state.location.length > 0 && <div className="showaddres"><span>— in </span> {this.state.location}</div>)
            }
            {
              (this.state.selectFile != null) && <div className="img_preview"><img src={this.isImagePreview()} alt="" /></div>
            }
            {
              (selectDate !== currentDate) && <div className="showdate"><span>— date </span><input value={currentDate} disabled="disabled" /></div>
            }
          </div>
          <div className="custom_post">
            <div className="tags">
              <TagsInput getTags={ this.getTags }/>
            </div>
            <div className="options">
              <div className="place-wrapper">
                <span className="icon-location" onClick={this.showInputPlaces}></span>
                {
                  this.state.isPlace && <LocationSearchInput getLocation={this.getLocation} />
                }
              </div>
              <div className="upload_img">
                <span className="icon-photo"></span>
                <input type="file" accept=".png, .jpg, .jpeg" onChange={this.fileSelected} />
              </div>
              <div className="picktime">
                <span className="icon-today" onClick={this.toggleOpenPicker}></span><DatePicker open={this.state.openPicker} selected={this.state.startDate} onChange={this.getDate} />
              </div>
              <div className="avatar_receiver"><img src={this.props.receiver.avatar} alt="" /></div>
            </div>
          </div>
          <div className="action">
            <div className="privacy">
              <Select isSearchable={false} className="privacy_select" value={selectedOption} onChange={this.setPrivacyMemory} options={options} />
            </div>
            <button type="button" disabled={!this.isEnabledShare()} onClick={this.shareMemory}>Share</button>
          </div>
        </div>
      </div>
    );
  }
}

export default MemoryPost;