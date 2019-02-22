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
                <p><div className="_is_online" style={ this.state._is_online ? {backgroundColor: "red"} : {backgroundColor: "green"} }></div>Paula</p>
                <p><div className="_is_online" style={ this.state._is_online ? {backgroundColor: "red"} : {backgroundColor: "green"}}></div>Sota</p>
            </div>
        )
    }

}

export default FriendList;