import React, { Component } from 'react';

class ChangeUser extends Component {

    constructor(props) {
        super(props)

        this.state = {
            sender: ''
        }

        this.list_button = [];
    }

    componentWillMount = () =>{
        this.setState({
            sender: localStorage.getItem('sender')
        })
    }

    reload = () => {
        window.location.reload();
    }

    changeSender = () => {
        localStorage.setItem("sender", 'tradatech');
        alert('done ,  sender now: sotatek, you must refresh ');
        this.reload();
    }

    changeSender1 = () => {
        localStorage.setItem("sender", 'sotatek');
        alert('done, sender now: sotatek , you must refresh ');
        this.reload();
    }

    changeSender2 = () => {
        localStorage.setItem("sender", 'paulra');
        alert('done ,  sender now: paulra ,you must refresh ');
        this.reload();
    }

    changeSender3 = () => {
        localStorage.setItem("sender", 'richard');
        alert('done ,  sender now: richard ,you must refresh ');
        this.reload();
    }

    changeSender4 = () => {
        localStorage.setItem("sender", 'sugar');
        alert('done ,  sender now: sugar ,you must refresh ');
        this.reload();
    }
    changeSender5 = () => {
        localStorage.setItem("sender", 'sotatrada');
        alert('done ,  sender now: sotatrada ,you must refresh ');
        this.reload();
    }

    render() {
        return (
            <div className="layer_common">
                <ul>
                    <li className="btn_common chose">now :{this.state.sender}</li>
                    <li className="btn_common" onClick={this.changeSender} >
                        tradatech
                    </li>

                    <li className="btn_common" onClick={this.changeSender1} >
                        sotatek
                    </li>

                    <li className="btn_common" onClick={this.changeSender2} >
                        paulra
                    </li>

                    <li className="btn_common" onClick={this.changeSender3} >
                        richard
                    </li>

                    <li className="btn_common" onClick={this.changeSender4} >
                        sugar
                    </li>

                    <li className="btn_common" onClick={this.changeSender5} >
                        sotatrada
                    </li>
                </ul>
            </div>
        )
    }
}

export default ChangeUser;