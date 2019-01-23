import React, { Component } from 'react';
import FormLogin from './FormLogin';
import '../sass/login.scss';

class Login extends Component {

    constructor(props) {
        super(props);
        this.state = {
            value: null,
            test: 'This is form login',
        }
    }

    render() {
        return (
            <div>
                <div>
                    {this.state.test}
                    <FormLogin />
                </div>
            </div>
        )
    }
}

export default Login;