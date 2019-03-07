import React, { Component } from 'react';
import axios from 'axios';
import { connect } from 'react-redux';

const mapStateToProps = (state) => {

    console.log(state);
    return {
        ...state.addToDo
    };

}

function mapDispatchToProps (dispatch) {
    // eslint-disable-next-line no-labels
    // eslint-disable-next-line no-unused-expressions
    onChangeTest: value => {
        dispatch({
            type: 'ADD_TODO',
            value
        })
    }
}

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
            user2: 'richard',
            test: ' '
        }

        this.list_friend = [];
        this.changeTest = (event) => { this.props.onChangeTest(event.target.value) };
    }

    componentWillMount() {
        console.log(this.props);
    }

    hiddenListFriend = () => {
        this.setState({
            see_list: !this.state.see_list
        })
    }

    render() {
        return (
            <div className="list_friend div_tr" style={{ height: this.state.see_list ? '500px' : '40px', width: this.state.see_list ? '200px': '80px' }}>
                <span className="btn_hidden" onClick={this.hiddenListFriend}> {this.state.see_list ? 'hidden' : 'show'}</span>
                <div className="online_friend" style={{ display: this.state.see_list ? 'block' : 'none' }}>
                    <label >
                        <div>
                            <div className="_is_online" style={this.state._is_online ? { backgroundColor: "red" } : { backgroundColor: "green" }}></div>
                            <span className="span_common">{this.state.user1}</span>
                        </div>
                    </label>
                    <label>
                        <div>
                            <div className="_is_online" style={this.state._is_online ? { backgroundColor: "red" } : { backgroundColor: "green" }}></div>
                            <span>{this.state.user2}</span>
                        </div>
                    </label>
                        <input placeholder="test" defaultValue={this.state.value} onChange = {this.changeTest} />
                        <button className="common_btn">Submit</button>
                </div>
            </div>
        )
    }

}

export default connect(mapStateToProps, mapDispatchToProps)(FriendList);