import React, { Component } from 'react';
import Game from './game';

export class Home extends Component {
  login() {
    this.props.auth.login();
  }

  render() {
    const { isAuthenticated } = this.props.auth;
    return (
      <div>
        {
          isAuthenticated() && (
            <div>
              <Game auth={this.props.auth}/>
            </div>
          )
        }
        {
          !isAuthenticated() && (
            <h4>
              You are not logged in! Please{' '}
              <a
                style={{ cursor: 'pointer' }}
                onClick={this.login.bind(this)}
              >Log in</a>
              {' '}to continue.
            </h4>
          )
        }
      </div>
    )
  }
}

export default Home
