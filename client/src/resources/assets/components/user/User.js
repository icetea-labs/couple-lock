import React, { Component } from 'react';

class User extends Component {

    constructor(props) {
        super(props)

        this.state ={
            
        }
    }

    changeSender = () => {
        localStorage.setItem("sender", 'tradatech');
    }

    render() {
        return (
            <div>
                <p>Chúng tôi đang phát triển tính năng này</p>
                <button className="btn_common" onClick={this.changeSender}><a href='/' >tradatech</a></button>
            </div>

        )
    }
}

export default User;