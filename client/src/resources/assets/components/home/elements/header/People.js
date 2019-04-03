import React, { Component } from 'react';
import MaterialIcon from 'material-icons-react';

class People extends Component {

    constructor(props) {
        super(props)

        this.state = {
            is_open: true
        }

        // this.is_open = true
        this.acceptFriend = []
    }

    componentWillMount(){
        this.fetchData();
    }

    isOpen = () => {
        this.setState({
            is_open: !this.state.is_open
        })
    }

    fetchData = () => {
        for ( let i = 0 ; i < 8 ; i ++){
            this.acceptFriend.push(
                <div className="invite" >
                    <image />
                    <label>name</label>
                    <span id="confirm" >CONFIRM</span>
                    <span id="delete">DELETE</span>
                </div>
            )
        }
    }

    render() {
        return (
            <div className="people">
                <span className="people_notification" onClick={this.isOpen} >
                    <MaterialIcon icon='people' />  
                    <span>1</span>
                </span>
                <div className="pointed" style={{ display: this.state.is_open ? 'block' : 'none' }}></div>
                <div className="people_content" style={{ display: this.state.is_open ? 'block' : 'none' }} >
                    <span id ="friend-request">FriendRequest</span>
                    <span id ="setting">Setting</span>
                    <div className="list-invite">
                        {this.acceptFriend}
                    </div>
                    <span className="see-all">See all</span>
                </div>    
            </div>
        );
    }
}

export default People;