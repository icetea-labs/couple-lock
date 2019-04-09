import React, { Component } from 'react';
import socketIOClient from 'socket.io-client';

const socket = socketIOClient('localhost:5000');
class TestButton extends Component {
    constructor(props) {
        super(props);

        this.state = {
            host: 'localhost:5000',

            /// 
            color: 'white',
            ///

            test: 'test'
        }


        this.send = this.send.bind(this);
    }

    send () {
        // socket.emit('createNoti', "ok");
    }

    setColor = (color) => {
        this.setState({ color });
    }

    // componentDidMount() {
    //     setInterval(this.send(), 1000);
    //     socket.on('receiveNoti', (receiver) => {
    //         console.log('i receiver', receiver);
    //     })
    // }

    render() {
        return (
            <div className="test">
                <button className="btn_common" onClick={this.send()} >CreateNoti</button>
            </div>
        );
    }
}

export default TestButton;