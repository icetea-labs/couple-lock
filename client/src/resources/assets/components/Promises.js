import React, { Component } from 'react';

class Promises extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loginUser: window.getLoginUser(),
    };
  }

  render() {
    const deniedPromises = this.props.deniedPromises;
    const {loginUser} = this.state;
    const sender = this.props.user.sender;
    const receiver = this.props.user.receiver;
    return (
      <div className="request_promises">
        <h3 className="title title_promises">Pending promise</h3>
        <div className="request">
          {
            deniedPromises.length > 0 && deniedPromises.map((item, index) =>{
              return(
                <div className="request__items" key={index}>
                  <div className="request__items__avatar">
                    <img src={item.avatar} alt="" />
                  </div>
                  <div className="detail">
                    <button className="request__items__displayname"> {item.displayName} </button>
                    { (loginUser === sender) && <div className="request__items__pending">Pending</div> }
                    <div className="request__items__username">{item.username}</div>
                    {
                      (loginUser === receiver) && <div className="request__items__btn">
                      <button className="request__items__btn__accept">Accept</button>
                      <button className="request__items__btn__delete">Delete</button>
                      </div>
                    }
                  </div>
                </div>
              )
            })
          }
        </div>
      </div>
    );
  }
}

export default Promises;