import React, { Component } from 'react';

class test extends Component {
  constructor(props) {
    super(props);
    this.state = {
      test: [],
    }
  }

  setState = () => {
    let a = "test"
    this.setState({a});
  }

  componentDidMount() {
    this.setState();
  }
  
  render() {
    console.log(this.state.test);
    return (
      <div>
        
      </div>
    );
  }
}

export default test;