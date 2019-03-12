import React, { Component } from 'react';
import MaterialIcon, { mail, settings } from 'material-icons-react';
import axios from 'axios';
import Content from './notification/ConTent'
import ToolTip from '../../../helper/ToolTip';
import { setInterval } from 'timers';

class Notification extends Component {

    constructor(props) {
        super(props)

        this.state = {
            see_noti: false,
            total_noti: 0,
            list_noti: [],
        }

        this.showNoti = [<div>loading</div>];
        this.content = [];
    }

    seeNotification = () => {
        this.setState({
            see_noti: !this.state.see_noti
        })

        try {
            setTimeout((this.content = <Content />), 1);
        } catch (err) {
            throw err;
        }

    }

    render() {
        return (
            <div className="notification" onClick={this.seeNotification} >
                <span className="icon_noti" onClick={this.checkAll}>
                    <MaterialIcon icon="mail" color="white" />
                    <div className="number_notification" style={{ display: this.state.total_noti === 0 ? 'none' : 'block' }}>
                        <span >
                            {this.state.total_noti}
                        </span>
                    </div>
                    <ToolTip name="thông báo" />
                </span>
                <div className="pointed" style={{ display: this.state.see_noti ? 'block' : 'none' }}></div>
                <div className="list_notification" style={{ display: this.state.see_noti ? 'block' : 'none' }}>
                    <div className="noti_header">
                        <label>Thông báo</label>
                        <span onClick={this.toCheckViewed}>Đánh dấu tất cả là đã đọc</span>
                    </div>
                    {/* Begin */}
                    {this.content}
                    {/* End */}
                    <div className="noti_footer">
                        <button className="btn_settings"  >
                            <MaterialIcon icon="settings" />
                            Cài đặt
                        </button>
                        <span>
                            <a href="/notification">
                                Xem tất cả các thông báo
                            </a>
                        </span>
                    </div>
                </div>
            </div>
        );
    }
}

export default Notification;