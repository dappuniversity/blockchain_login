import React, { Component } from 'react';

class Unauthorized extends Component {
  render() {
    return (
      <div>
        <h1>Sorry, you're unauthorized!</h1>
        <p>Your account {this.props.account} is unauthorized. Please sign up.</p>
      </div>
    );
  }
}

export default Unauthorized;
