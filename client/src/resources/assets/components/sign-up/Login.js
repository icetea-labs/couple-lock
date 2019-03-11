import React, { Component } from 'react';
import GoogleLogin from 'react-google-login';
import { Grid, Col, Row } from 'react-bootstrap';
import MaterialIcon, { mail } from 'material-icons-react';

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
            id: [],
            directroute: '/login/profile',
            googleApp: '656940544950-kofdct0ehtdslu1uf461si4f2vlk5mn8.apps.googleusercontent.com',
            isChecked: false
        }
    }

    /**
     * @param showProfileGoogle collect information of user and send to profile
     */

    showProfileGoogle = (result) => {
        this.setState({
            name: result.profileObj.name,
            email: result.profileObj.email,
            img_url: result.profileObj.imageUrl,
            id: result.profileObj.googleId
            //    displayname: result.profileObject.displayname
        })
        localStorage.setItem("name", this.state.name);
        localStorage.setItem("email", this.state.email);
        localStorage.setItem("img_url", this.state.img_url);
        console.log(result)
        this.props.history.push(`/login/profile`);
    }
    
    

    /**
     * @param redirectToTarget direact to profile information
     */

    redirectToTarget = () => {
        this.props.history.push(`/login/profile`)
    }

    render() {
        return (
            <div className="login_page">
                <div className="social_login">
                    <div>
                        <h2> Chose the way to login</h2>
                        <div className="rule_login">
                            <textarea readOnly defaultValue="By Login With Google, We only know your name and address  :D" ></textarea>
                        </div>
                        <GoogleLogin
                            clientId={this.state.googleApp}
                            render={renderProps => (
                                <button className="btn_google_login" onClick={renderProps.onClick} ><MaterialIcon icon="mail" width="20px" height="20px" color="white" />Login with Google</button>
                            )}
                            buttonText="Login"
                            onSuccess={this.showProfileGoogle}
                        />
                        <button className="btn_user_login" onClick={this.redirectToTarget}>No google, I hate it!</button>
                    </div>
                    <div>
                    </div>
                </div>

            </div>
        )
    }
}

export default Login;