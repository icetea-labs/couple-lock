import React, { Component } from 'react';
import { Grid, Col } from 'react-bootstrap';
import { MetaTags } from 'react-meta-tags';
import { Helmet } from 'react-helmet';


class FormLogin extends Component {

    constructor(props) {
        super(props);
        this.state = {
            user_name: [],
            display_name: [],
            img_url: [],
            file: 'null',
        }
        this.handleChange = this.handleChange.bind(this);
        this.usnChange = this.usnChange.bind(this);
        this.dnChange = this.dnChange.bind(this);
    }


    handleChange(event) {

        this.setState({
            img_url: URL.createObjectURL(event.target.files[0])
        })
    }

    usnChange(event) {
        this.setState({
            user_name: event.target.value
        })
    }

    dnChange(event) {
        this.setState({
            display_name: event.target.value
        })
    }

    componentDidMount() {
        fetch('/api/user/profile')
            .then(results => results.json())
            .then((data) => {
                this.setState({ display_name: data.display_name})
                this.setState({ img_url: data.img_url})
            });

}

render() {
    return (
        <Grid className="form_login">
            <MetaTags>
                <meta name="google-signin-client_id" content="656940544950-kofdct0ehtdslu1uf461si4f2vlk5mn8.apps.googleusercontent.com" />
            </MetaTags>
            < Helmet>
                <script src="https://apis.google.com/js/platform.js" async defer></script>
                <script src="https://apis.google.com/js/client:platform.js" async defer>
                </script>
            </Helmet>

            <label> Change your information</label>
            <Col lg={6}>
                <img src={this.state.img_url} id="avatar_login" width="100" height="100" />
            </Col>
            <Col lg={6}>
                <input type="file" accept="img, mp4" onChange={this.handleChange} />
            </Col>
            <Col lg={6}>
                <input placeholder="User Name" value={this.state.user_name} onChange={this.usnChange} />
            </Col>
            <Col lg={6}>
                <input placeholder="Display Name" value={this.state.display_name} onChange={this.dnChange} />
            </Col>
            <Col>
                <button type="submit">Submit</button>
            </Col>
        </Grid>
    )
}
}

export default FormLogin;