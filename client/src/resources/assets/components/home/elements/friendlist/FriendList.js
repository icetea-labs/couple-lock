import React, { Component } from 'react';
import axios from 'axios';
import { connect } from 'react-redux';

const mapStateToProps = (state) => ({...state.handlListFriend});

const mapDispatchToProps = (dispatch) => ({
    // eslint-disable-next-line no-unused-expressions
    addFriendChat: (username) => {
        dispatch({
            type: 'ADD_FRIEND',
            username
        })
    }
})

class FriendList extends Component {

    constructor() {
        super();

        this.state = {
            _is_online: true,
            amountChatBox: 0,
            targetChat: [],
            see_list: false,
            target: 'show',
            all_friend: [
                { username: 'paulra', name: 'Paula Woker', status: true },
                { username: 'tradatech', name: 'Truong Thi', status: false },
                { username: 'sotatek', name: 'Sota la', status: true }
            ],
            test: ' '
        }

        this.list_friend = [];
        this.addFriend = (username) => { this.props.addFriendChat(username) };
    }

    componentDidMount() {
        for (let i = 0; i < this.state.all_friend.length; i++) {
            this.list_friend.push(
                <label key={i} >
                    <div>
                        <div className="_is_online" style={this.state._is_online ? { backgroundColor: "red" } : { backgroundColor: "green" }}></div>
                        <span className="span_common" key={i} >
                            {this.state.all_friend[i].name}
                        </span>
                    </div>
                </label>
            )
        }
    }

    hiddenListFriend = () => {
        this.setState({
            see_list: !this.state.see_list
        })
    }

    render() {
        return (
            <div className="list_friend div_tr" style={{ height: this.state.see_list ? '500px' : '40px', width: this.state.see_list ? '200px' : '80px' }}>
                <span className="btn_hidden" onClick={this.hiddenListFriend}> {this.state.see_list ? 'hidden' : 'show'}</span>
                <div className="online_friend" style={{ display: this.state.see_list ? 'block' : 'none' }}>
                    {
                        this.list_friend
                    }
                </div>
            </div>
        )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(FriendList);