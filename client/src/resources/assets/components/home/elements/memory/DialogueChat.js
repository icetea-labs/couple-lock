import React, { Component } from 'react';
import moment from 'moment';
import axios from 'axios';
import PubSub from 'pubsub-js';
import PreviewImages from './ImagesPreview';

class DialogueChat extends Component {
  constructor (props) {
    super(props);
    this.state = {
      memoryList: [],
      tagsFilterResult: null,
      tagsFilterText: [],
      imgList: [],
    }
  }

  componentWillReceiveProps(nextProps) {
    if(this.props.proposeId !== nextProps){
      const proposeId = this.props.proposeId;
      axios.get(`/api/memory/list?proposeId=${proposeId}`)
      .then(res => {
        const dataSort = res.data.data.sort(function(a, b) { return b.timestamp - a.timestamp })
        this.setState({ memoryList: dataSort });
        this.getImageSlide(dataSort);
      });
    }
  }

  componentWillMount(){
    PubSub.subscribe('filterTasg', (msg, tags) => {
      this.setState({ tagsFilterResult: tags});
    });
    //tags filter text
    PubSub.subscribe('tagsFilterText', (msg, text) => {
      this.setState({ tagsFilterText: text });
    });
  }

  getImageSlide = data => {
    const imgList = [];
    Object.keys(data).map(item => {
      if(data[item].attachments[0] && data[item].attachments[0].type === "photo"){
        const obj = {
          src: data[item].attachments[0].url,
          title: data[item].message,
        }
        imgList.push(obj)
      }
    })

    this.setState({ imgList: imgList })
  }

  showMemory = () =>{
    const sender = this.props.sender;
    const receiver = this.props.receiver;
    const {tagsFilterResult} = this.state;
    if(tagsFilterResult && tagsFilterResult.length > 0){
      const data = tagsFilterResult.map((item, index) => {
        const locationName = item.attachments.find(x => x.type === 'location');
        const num = parseInt(item.timestamp);
        const date = moment(num).format("MM/DD/YYYY");
        const className = (sender.username === item.sender) ? "sender" : "receiver";
        const avatar = (sender.username === item.sender) ? sender.avatar : receiver.avatar;
        const userName = (sender.username === item.sender) ? sender.username : item.sender;
        return(
          <div className="chat_content" key={index}>
              <div className={className}>
                <div className="user_photo fl"><img src={avatar} alt="" /></div>
                <div className="content_detail fl clearfix">
                  <span className="user_name color-violet" >{userName}</span>
                  {
                    (locationName) && <span className="location"> is at <i>{locationName.name}</i></span>
                  }
                  <span className="time fr color-grey">{date}</span>
                  <div className="tags_wrapper">
                    {
                      (item.tags && item.tags.length > 0) && item.tags.map((tagslist, index) => {
                        return <span key={index} className="tags_item">#{ tagslist }&nbsp;</span>
                      })
                    }
                  </div>
                  <p>{item.message}</p>
                  {
                    (item.attachments[0] && item.attachments.length > 0) && <p className="attachments">
                      <img src={item.attachments[0].url} alt="" onClick={() => this.setImgUrl(item.attachments[0].url) } />
                    </p>
                  }
                </div>
              </div>
            </div>
        )
      });
      return data;
    }else if(tagsFilterResult && tagsFilterResult.length === 0){
      return <div className="msg_notags">Tags not found !!!</div>
    }else{
      return(
        this.state.memoryList.length > 0 && this.state.memoryList.map((item, index) => {
          const locationName = item.attachments.find(x => x.type === 'location');
          const num = parseInt(item.timestamp);
          const date = moment(num).format("MM/DD/YYYY");
          const className = (sender.username === item.sender) ? "sender" : "receiver";
          const avatar = (sender.username === item.sender) ? sender.avatar : receiver.avatar;
          const userName = (sender.username === item.sender) ? sender.username : item.sender;
          return (
            <div className="chat_content" key={index}>
              <div className={className}>
                <div className="user_photo fl"><img src={avatar} alt="" /></div>
                <div className="content_detail fl clearfix">
                  <span className="user_name color-violet" >{userName}</span>
                  {
                    (locationName) && <span className="location"> is at <i>{locationName.name}</i></span>
                  }
                  <span className="time fr color-grey">{date}</span>
                  <div className="tags_wrapper">
                    {
                      (item.tags && item.tags.length > 0) && item.tags.map((tagslist, index) => {
                        return <span key={index} className="tags_item">#{ tagslist }&nbsp;</span>
                      })
                    }
                  </div>
                  <p>{item.message}</p>
                  {
                    (item.attachments[0] && item.attachments.length > 0) && <p className="attachments">
                      <img src={item.attachments[0].url} alt="" onClick={() => this.setImgUrl(item.attachments[0].url) } />
                    </p>
                  }
                </div>
              </div>
            </div>
          )
        })
      )
    }
  }
  
  tagsToolBar = () =>{
    if(this.state.tagsFilterText.length > 0){
      return(
        <div className="tags_toolbar">
          <label>Tags Filter : &nbsp;</label>
          <span>{this.state.tagsFilterText}</span>
          <button onClick={this.removeFilterTags}>&nbsp;x</button>
        </div>
      )
    }
  }

  removeFilterTags = () =>{
    this.setState({
      tagsFilterResult: null,
      tagsFilterText: '',
    });
  }
  
  setImgUrl = url =>{
    PubSub.publish('setImgUrl', url)
  }

  render() {
    const {imgList} = this.state;
    return (
      <div>
        { this.tagsToolBar() }
        <div className="dialogue_chat mg-auto">
          <div className="box"> { this.showMemory() } </div>
        </div>
        <PreviewImages imgList={imgList}/>
      </div>
    );
  }
}

export default DialogueChat;