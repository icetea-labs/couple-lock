import React, { Component } from 'react';

class DeniedPromises extends Component {
  constructor(props){
    super(props)
    this.state = {};
  }

  showDeniedPromises = () =>{
    if(this.props.deniedPromises && this.props.deniedPromises.length > 0){
      const result = this.props.deniedPromises.map((item, index) => {
        return(
          <div className="request__items" key={index}>
            <div className="request__items__avatar">
              <img src={item.avatar} alt="" />
            </div>
            <div className="detail">
              <button className="request__items__displayname"> {item.displayName} </button>
              <div className="request__items__pending">Denied</div>
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
        {this.props.deniedPromises.length > 0 && <h3 className="title title_promises">Denied promise</h3>}
        {this.showDeniedPromises()}
      </div>
    );
  }
}

export default DeniedPromises;