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
              <Game auth={this.props.auth} getUser={this.props.getUser}/>
            </div>
          )
        }
        {
          !isAuthenticated() && (
            <h4>
              You are not logged in! Please{' '}
              <div
                style={{ cursor: 'pointer' }}
                onClick={this.login.bind(this)}
              >Log in</div>
              {' '}to continue.
            </h4>
          )
        }
      </div>
    )
  }
}

export default Home
