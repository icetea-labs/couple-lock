import React, { Component } from 'react';
import MaterialIcon from 'material-icons-react';
import axios from 'axios';
import Content from './notification/Content'
import ToolTip from '../../../helper/ToolTip';

class Notification extends Component {

    constructor(props) {
        super(props)

        this.state = {
            see_noti: false,
            total_noti: 1,
        }

        this.total_noti = 1;
    }

    componentWillMount() {
        axios.get('/api/noti/list?username=').then(data =>
            this.total_noti = data.data.data.length
        )
    }

    seeNotification = () => {
        this.setState({
            see_noti: !this.state.see_noti
        })
    }

    toCheckViewed() {
        axios.get()
    }

    render() {
        return (
            <div className="notification" onClick={this.seeNotification} >
                <span className="icon_noti" onClick={this.checkAll}>
                    <MaterialIcon icon="notifications" color="white" />
                    <div className="number_notification">
                        <span >
                            {this.total_noti}
                        </span>
                    </div>
                    <ToolTip name="thông báo" />
                </span>
                <div className="pointed" style={{ display: this.state.see_noti ? 'block' : 'none' }}></div>
                <div className="list_notification" style={{ display: this.state.see_noti ? 'block' : 'none' }}>
                    <div className="noti_header">
                        <div id='title'>Notification</div>
                        <div id='make-all' onClick={this.toCheckViewed}>Make all read</div>
                        <div id='setting'>Setting</div>
                    </div>
                    {/* Begin */}
                    <Content />
                    {/* End */}
                    <div className="noti_footer">
                        <span>See all</span>
                    </div>
                </div>
            </div>
        );
    }
}

export default Notification;