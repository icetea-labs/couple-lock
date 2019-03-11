import React, { Component } from 'react';

class SentPromises extends Component {
  constructor(props){
    super(props)
    this.state={

    };
  }

  showSentPromises = () =>{
    if(this.props.sentPromises){
      const result = this.props.sentPromises.map((item, index) => {
        return(
          <div className="request__items" key={index}>
            <div className="request__items__avatar">
              <img src={item.avatar} alt="" />
            </div>
            <div className="detail">
              <button className="request__items__displayname"> {item.displayName} </button>
              <div className="request__items__pending">Pending</div>
              <div className="request__items__username">@{item.username}</div>
            </div>
          </div>
        )
      });
      return result;
    }
  }

  render() {
    return (
      <div className="sent_promises">
        {this.props.sentPromises.length > 0 && <h3 className="title title_promises">Sent promise</h3>}
        {this.showSentPromises()}
      </div>
    );
  }
}

export default SentPromises;