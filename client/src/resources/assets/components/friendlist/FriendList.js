import React, { Component } from 'react';
import MaterialIcon, { exit } from 'material-icons-react';
import axios from 'axios';
import ReduxAction from '../redux/action';
import { subscribe, dispatch } from 'redux';
import createChat from '../redux/function';


class FriendList extends Component {

    constructor(props) {
        super(props)

        this.state = {
            _is_online: true,
            amountChatBox: 0,
            targetChat: [],
            see_list: false,
            target: 'show',
            user1: 'puala',
            user2: 'richard'
        }
    }

    componentWillMount() {
        console.log(ReduxAction.getState());
    }


    testRedux() {
        let data = {
            form: 'chat_room',
            location: 'listfriend',
            status: {
                see_chat: true,
                is_hidden: true,
            },
            receiver: 'paula',
        }


        console.log(ReduxAction.dispatch(createChat(data)));
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
            <div className="list_friend div_tr" style={{ height: this.state.see_list ? '500px' : '40px' }}>
                <span className="btn_hidden" onClick={this.hiddenListFriend}> {this.state.target}</span>
                <div className="online_friend" style={{ display: this.state.see_list ? 'block' : 'none' }}>
                    <label >
                        <div>
                            <div className="_is_online" style={this.state._is_online ? { backgroundColor: "red" } : { backgroundColor: "green" }}></div>
                            <span type="button" onClick={this.testRedux}>{this.state.user1}</span>
                        </div>
                    </label>
                    <label>
                        <div>
                            <div className="_is_online" style={this.state._is_online ? { backgroundColor: "red" } : { backgroundColor: "green" }}></div>
                            <span>{this.state.user2}</span>
                        </div>
                    </label>
                </div>

            </div>
        )
    }

}

export default FriendList;