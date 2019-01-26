import React, { Component } from 'react';
import userServices from '../services/userServices'
import Game from './Home'

class Home extends Component {
  login() {
    this.props.auth.login();
  }

  componentWillMount() {
    const { userProfile, getProfile } = this.props.auth
    console.log(this.props.auth)
    if (!userProfile) {
      getProfile((err, profile) => {
        this.props.setProfile(profile)
      })
    } else {
      this.props.setProfile(userProfile)
    }
  }

  componentDidMount() {
    userServices.getUserByUsername(this.props.profile.nickname) 
      .then(dbUser => this.props.setUser(dbUser))
      .catch(err => console.log(err))
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
