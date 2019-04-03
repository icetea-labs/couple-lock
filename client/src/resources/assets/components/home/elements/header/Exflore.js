import React, { Component } from 'react';
import  MaterialIcon from 'material-icons-react';
import ToolTip from '../../../helper/ToolTip';

class Exflore extends Component {
    render() {
        return (
            <div className="exflore-header">
                <span>
                    Exflore
                    <MaterialIcon icon="expand_more" />
                    <ToolTip name="Khám phá" />
                </span>
            </div>
        );
    }
}

export default Exflore;