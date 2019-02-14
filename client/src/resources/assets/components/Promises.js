import React, { Component } from 'react';
import axios from 'axios';

class Promises extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loginUser: window.getLoginUser(),
    };
  }

  statusPromises = (pId) => {
    const proposeId = pId;
    const react = 1;
    const message = "Ok, I'm Paulra, Nice to meet you.";
    const dataValue = new FormData();
    dataValue.append('id', proposeId);
    dataValue.append('react', react);
    dataValue.append('message', message);

    axios.post('/api/propose/reply', dataValue)
    .then(res => {
      console.log(res);
      console.log(res.data);
    })

    // this.props.fetchData();
    window.location.reload();
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
                <div className="request__items" key={index} pid={item.proposeId}>
                  <div className="request__items__avatar">
                    <img src={item.avatar} alt="" />
                  </div>
                  <div className="detail">
                    <button className="request__items__displayname"> {item.displayName} </button>
                    { (loginUser === sender) && <div className="request__items__pending">Pending</div> }
                    <div className="request__items__username">{item.username}</div>
                    {
                      (loginUser === receiver) && <div className="request__items__btn">
                      <button type="button" className="request__items__btn__accept" onClick={() => this.statusPromises(item.proposeId) }>Accept</button>
                      <button type="button" className="request__items__btn__delete">Delete</button>
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