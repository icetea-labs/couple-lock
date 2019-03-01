import React, { Component } from 'react';
import MaterialIcon, { mail } from 'material-icons-react';

class Notification extends Component {

    constructor(props) {
        super(props)

        this.state = {
            see_noti: false
        }
    }

    seeNotification = () => {
        if (this.state.see_noti === true) {
            this.setState({
                see_noti: false
            })
        }

        if (this.state.see_noti === false) {

            this.setState({
                see_noti: true
            })
        }
    }

    render() {
        return (
            <div className="notification" onClick={this.seeNotification} >
                <MaterialIcon icon="mail" color="white" />
                <div className="number_notification">
                    <span>1</span>
                </div>
                <div className="pointed" style={{ display: this.state.see_noti ? 'block' : 'none' }}></div>
                <div className="list_notification" style={{ display: this.state.see_noti ? 'block' : 'none' }}>
                    <ul>
                        <li>
                            a
                        </li>
                    </ul>
                </div>
            </div>
        );
    }
}

export default Notification;