import React, { Component } from 'react';
import MaterialIcon from 'material-icons-react';
import ToolTip from '../../../helper/ToolTip';

class Settings extends Component {

    constructor(props) {
        super(props);

        this.state = {
            see_s_menu: false
        }
    }

    seeMenu = () => {
        this.setState({
            see_s_menu: !this.state.see_s_menu
        })
    }

    render() {
        return (
            <div className="setting" onClick={this.seeMenu}>
                <MaterialIcon icon="settings" />
                <ToolTip name="cài đặt" />
                <div className="menu_settings" style={{ display: this.state.see_s_menu ? 'block' : 'none' }}>
                    <div className="pointed"></div>
                    <div className="s_dropdown">
                    </div>
                </div>
            </div>
        );
    }
}

export default Settings;