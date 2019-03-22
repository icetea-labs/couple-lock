import React, { Component } from 'react';

class ChangeUser extends Component {

    constructor(props) {
        super(props)

        this.state = {
            sender: '',
            isOpen: false,
            list_user: [
                'tradatech', 'sotatek', 'paulra', 'sugar', 'sotatrada', 'richard'
            ]
        }

        this.list_button = [];
    }

    componentWillMount = () => {
        this.setState({
            sender: localStorage.getItem('sender')
        })
    }


    componentDidMount() {
        this.list_button = this.state.list_user.map((item, index) => {
            return (
                <li key={index} id={index} className="btn_common " onClick={(e) => { this.changUser(e.target.id) }}>{item}</li>
            )
        })
    }

    changUser = (event) => {
        localStorage.setItem('username', this.state.list_user[event]);
        window.location.reload();
    }

    handleChangeUser = () => {
        this.setState({
            isOpen: !this.state.isOpen
        })
    }

    render() {
        return (
            <div className="layer_common div_tr">
                <li className="btn_common chose">now :{localStorage.getItem('username')}</li>
                <ul className="" style={{ display: this.state.isOpen ? 'block' : 'none' }}>
                    {
                        this.list_button
                    }
                </ul>
                <button className="btn_common" onClick={this.handleChangeUser}  >
                    {this.state.isOpen ? 'Hidden' : 'Open'}
                </button>
            </div>
        )
    }
}

export default ChangeUser;