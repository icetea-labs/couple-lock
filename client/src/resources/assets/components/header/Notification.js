import React, { Component } from 'react';
import MaterialIcon, { mail } from 'material-icons-react';
import axios from 'axios';
import { number } from 'prop-types';

class Notification extends Component {

    constructor(props) {
        super(props)

        this.state = {
            see_noti: false,
            total_noti: 0,
            list_noti: [
                { img_url: 'https://lh4.googleusercontent.com/-wK2szuWGtzA/AAAAAAAAAAI/AAAAAAAAClk/mYAPz5QBvMo/s96-c/photo.jpg', sender: localStorage.getItem("sender"), content: "được lắm con trai" },
                { img_url: localStorage.getItem("img_url"), sender: localStorage.getItem("sender"), content: "được lắm con trai" },
                { img_url: localStorage.getItem("img_url"), sender: localStorage.getItem("sender"), content: "được lắm con trai" }
            ],
        }

        this.showNoti = []
    }

    componentWillMount() {
        Promise.all(
            [axios.get('/api/noti/list?username=' + localStorage.getItem('sender'))]
        ).then(([data]) => {
            console.log(data);
            var allnoti = data.data.length;
            this.setState({
                total_noti: 3
            })
        })

        this.addNotification();
    }

    addNotification = () => {
        console.log()
        for (let i = 0; i < this.state.list_noti; i++) {

        }

        for (let i = 0; i < this.state.list_noti.length; i++) {
            this.showNoti.push(
                <li key={i} className="li_noti">
                    <img className="sender_img" src={this.state.list_noti[i].img_url} alt="" />

                    <span className="btn_common">
                        {this.state.list_noti[i].content}
                    </span>
                </li>
            )
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
                    <span style={{}}>
                        {this.state.list_noti.length}
                    </span>
                </div>
                <div className="pointed" style={{ display: this.state.see_noti ? 'block' : 'none' }}></div>
                <div className="list_notification" style={{ display: this.state.see_noti ? 'block' : 'none' }}>
                    <ul className="all__content">
                        {this.showNoti}
                    </ul>
                </div>
            </div>
        );
    }
}

export default Notification;