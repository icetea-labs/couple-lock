import React, { Component } from 'react';
import MaterialIcon , { logout } from 'material-icons-react';
import ToolTip from '../../../helper/ToolTip';

class LogOut extends Component {
    render() {
        return (
            <div  className="logout">
                <MaterialIcon icon="logout" />
                <ToolTip name="Đăng xuất" />;
            </div>
        );
    }
}

export default LogOut;