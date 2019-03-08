import React, { Component } from 'react';
import MaterialIcon, { settings } from 'material-icons-react';

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
                <div className="tooltip_common ">
                    <div className="pointed_common"></div>
                    <div className="content_common">Cài đặt</div>
                </div>
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