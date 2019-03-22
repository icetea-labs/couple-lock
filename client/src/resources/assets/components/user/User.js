import React, { Component } from 'react';
import CoverImage from './elements/CoverImage';

class User extends Component {

    constructor(props) {
        super(props)

        this.state = {

        }
    }

    render() {
        return (
            <div className="user-profile">
                {/* navigate */}
                <div className="navigate">
                    <div className="navigator">
                        <ul>
                            <li>Trang chủ</li>
                            <li>Thông báo</li>
                            <li>Promise</li>
                            <li>Notifacication</li>
                        </ul>
                    </div>
                    <div className="more"></div>
                </div>
                {/* end-navigate */}

                {/* header */}
                <div className="header">
                    <div className="cover-image"></div>
                    <div className="avatar">
                        <img src={localStorage.getItem("img_url")} alt="avatar" />
                    </div>
                </div>
                {/* end header */}

                {/* body */}
                <div className="body">
                    <div className="newfeed"></div>
                    <div className="infor-user">
                        <ul>
                            <li> Giới thiệu </li>
                            <li>Học vấn</li>
                            <li>Tình trạng quan hệ</li>
                        </ul>
                    </div>
                    <div className="image-user">

                    </div>
                </div>
                {/* end body */}
            </div>
        )
    }
}

export default User;