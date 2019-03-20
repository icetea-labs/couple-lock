import React, { Component } from 'react';
import MaterialIcon , { logout } from 'material-icons-react';
import ToolTip from '../../../helper/ToolTip';

class LogOut extends Component {

    logOut = () => {
        localStorage.removeItem('username');
        localStorage.removeItem('img_url');
        window.location.reload();
    }

    render() {
        return (
            <div  className="logout divtr" onClick={this.logOut} >
                <MaterialIcon icon="logout" />
                <ToolTip name="Đăng xuất" />
            </div>
        );
    }
}

export default LogOut;