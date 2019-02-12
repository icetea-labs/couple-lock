import React, { Component } from 'react';

class Addpromises extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    const userInfo = this.props.userInfo;
    const loginUser = window.getLoginUser();
    return (
      <div className="request_promises">
        <h3 className="title title_promises">Pending promise</h3>
        <div className="request">
          {
            userInfo.length > 0 && userInfo.filter(i => i.r_react === 2).map((item, index) =>{
              return(
                <div className="request__items" key={index}>
                  <div className="request__items__avatar">
                    <img src={item.avatar} alt="" />
                  </div>
                  <div className="detail">
                    <button className="request__items__name">{item.displayName}</button>
                    <div className="request__items__btn">
                      <button className="request__items__btn__accept">Accept</button>
                      <button className="request__items__btn__delete">Delete</button>
                    </div>
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

export default Addpromises;