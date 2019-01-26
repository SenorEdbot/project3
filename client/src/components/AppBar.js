import React, { Component } from 'react';
import '../App.css';

class App extends Component {
  goTo(route) {
    this.props.history.replace(`/${route}`)
  }

  login() {
    this.props.auth.login();
  }

  logout() {
    this.props.auth.logout();
  }

  componentDidMount() {
    const { renewSession } = this.props.auth;

    if (localStorage.getItem('isLoggedIn') === 'true') {
      renewSession();
    }
  }

  render() {
    const { isAuthenticated } = this.props.auth;

    return (
      <div>
            <button onClick={this.goTo.bind(this, 'home')}>
              Home
            </button>
            {
              !isAuthenticated() && (
                  <button onClick={this.login.bind(this)}>
                    Log In
                  </button>
                )
            }
            {
              isAuthenticated() && (
                <button onClick={this.goTo.bind(this, 'profile')}>
                  Profile
                </button>
              )
            }
            {
              isAuthenticated() && (
                  <button onClick={this.logout.bind(this)}>
                    Log Out
                  </button>
                )
            }
            {
              isAuthenticated() && (
                <button onClick={this.goTo.bind(this, 'stats')}>
                  Stats
                </button>
              )
            }
      </div>
    );
  }
}

export default App;
