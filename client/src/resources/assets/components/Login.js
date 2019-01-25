import React, { Component } from 'react';
import '../sass/login.scss';
import GoogleLogin from 'react-google-login';

class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            value: null,
            test: 'This is form login',
            name: [],
            img_url: [],
            email: [],
            result: {},
            directroute: '/login/profile',
            googleApp: '656940544950-kofdct0ehtdslu1uf461si4f2vlk5mn8.apps.googleusercontent.com',
        }
        this.showProfileGoogle = this.showProfileGoogle.bind(this);
    }

    showProfileGoogle = (result) => {
        this.setState({
            name: result.profileObj.name,
            email: result.profileObj.email,
            img_url: result.profileObj.imageUrl,
            //    displayname: result.profileObject.displayname
        })
        localStorage.setItem("name", this.state.name);
        localStorage.setItem("email", this.state.email);
        localStorage.setItem("img_url", this.state.img_url);
        console.log(result)
        this.props.history.push(`/login/profile`)
    }

    redirectToTarget = () => {
        this.props.history.push(`/login/profile`)
    }

    render() {
        return (
            <div>
                <div>
                    <GoogleLogin
                        clientId={this.state.googleApp}
                        render={renderProps => (
                            <button onClick={renderProps.onClick} >Login with Google</button>
                        )}
                        buttonText="Login"
                        onSuccess={this.showProfileGoogle}
                    />
                </div>
                <div>
                    <button onClick={console.log(this.state.result)}>test</button>
                </div>
            </div>
        )
    }
}

export default Login;