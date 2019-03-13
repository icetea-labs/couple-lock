import React, { Component } from 'react';
import moment from 'moment';
import axios from 'axios';
import PubSub from 'pubsub-js';

class DialogueChat extends Component {
  constructor (props) {
    super(props);
    this.state = {
      post: [],
      tagsFilter: [],
    }
  }
  
  componentWillReceiveProps(nextProps) {
    if(this.props !== nextProps){
      const proposeId = this.props.proposeId;
      axios.get(`/api/memory/list?proposeId=${proposeId}`)
      .then(res => {
        const dataSort = res.data.data.sort(function(a, b) { return b.timestamp - a.timestamp })
        this.setState({ post: dataSort });
      });
    }
  }

  
  componentWillMount(){
    PubSub.subscribe('filterTasg', (msg, tags) => {
      this.setState({ tagsFilter: tags});
      // console.log(this.state.tagsFilter);
    });
  }

  showMemory = () =>{
    const sender = this.props.sender;
    const receiver = this.props.receiver;
    const {tagsFilter} = this.state;
    if(tagsFilter && tagsFilter.length > 0){
        const data = tagsFilter.map((item, index) => {
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
                      <img src={item.attachments[0].url} alt="" />
                    </p>
                  }
                </div>
              </div>
            </div>
        )
      });
      return data;
    }else{
      return(
        this.state.post.length > 0 && this.state.post.map((item, index) => {
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
                      <img src={item.attachments[0].url} alt="" />
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

  render() {
    return (
      <div className="dialogue_chat mg-auto">
        <div className="box">
          { this.showMemory ()}
        </div>
      </div>
    );
  }
}

export default DialogueChat;