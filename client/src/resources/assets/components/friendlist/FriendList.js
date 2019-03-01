import React, { Component } from 'react';
import MaterialIcon, { exit } from 'material-icons-react';
import axios from 'axios';

class FriendList extends Component {

    constructor(props) {
        super(props)

        this.state = {
            _is_online: true,
            amountChatBox: 0,
            targetChat: [],
            see_list: false,
            target: 'show'
        }
    }

    addChatBox = () => {
        //TODO : onclick add user to chatbox
    }

    hiddenListFriend = () => {
        if (this.state.see_list === true) {
            this.setState({
                see_list: false,
                target: 'show'
            })
        } else {
            this.setState({
                see_list: true,
                target: 'hidden',
            })
        }
    }


    render() {
        return (
            <div className="list_friend div_tr" style={{height: this.state.see_list ? '500px' : '40px'}}>
                <span className="btn_hidden" onClick={this.hiddenListFriend}> {this.state.target}</span>
                <div className="online_friend" style={{display: this.state.see_list ? 'block' : 'none'}}>
                    <label >
                        <div className="_is_online" style={this.state._is_online ? { backgroundColor: "red" } : { backgroundColor: "green" }}></div>
                        <span>Puala</span>
                    </label>
                    <label>
                        <div className="_is_online" style={this.state._is_online ? { backgroundColor: "red" } : { backgroundColor: "green" }}></div>
                        <span>Sota</span>
                    </label>
                </div>

            </div>
        )
    }

}

export default FriendList;