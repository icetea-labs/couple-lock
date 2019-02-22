import React, { Component } from 'react';
import axios from 'axios';

class FriendList extends Component {

    constructor(props) {
        super(props)

        this.state = {
            _is_online: true,
        }
    }


    render() {
        return (
            <div className="list_friend">
                <label><div className="_is_online" style={this.state._is_online ? { backgroundColor: "red" } : { backgroundColor: "green" }}></div>Paula</label>
                <label><div className="_is_online" style={this.state._is_online ? { backgroundColor: "red" } : { backgroundColor: "green" }}></div>Sota</label>
            </div>
        )
    }

}

export default FriendList;