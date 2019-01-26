import React, { Component } from 'react';
import { Redirect, Route, Router } from 'react-router-dom';
import AppBar from './components/AppBar';
import Home from './components/Home';
import Stats from './components/Stats/Stats';
import Profile from './components/Profile/Profile';
import Callback from './Callback/Callback'
import Auth from './Auth/Auth';
import history from './history';
import userServices from './services/userServices'

const auth = new Auth();
class App extends Component {
  state = {
    profile: {},
    allUsers: [],
    user: {},
    currentUser: null
  }
  handleAuthentication = ({location}) => {
    if (/access_token|id_token|error/.test(location.hash)) {
      auth.handleAuthentication();
    }
  }

  getUser = (user) => {
    // TODO: refactor
    console.log(`Data retrieved for: ${user.name}`, user);
    this.setState({currentUser: user})
  }

  setProfile = (profile) => {
    this.setState({ profile: profile })
  }

  setUser = (user) => {
    this.setState({ user: user })
  }

  componentDidMount() {
    const { userProfile } = auth
    console.log(auth)
    if (userProfile) {
      this.setState({ profile: userProfile})
    } else {
      console.log("no current user")
    }
    userServices.getAllUsers()
      .then(allUsers => this.setState({ allUsers: allUsers.data }))
      .catch(err => console.log(err))

    // userServices.getUserByUsername(this.props.user.name) 
    //   .then(dbUser => this.setState({ user: dbUser.data }))
    //   .catch(err => console.log(err))
  }
  render() {
    const {user, allUsers, profile } = this.state
    console.log(user, allUsers, profile)
    return (
      <Router history={history}>
        <div>
          <Route path="/" render={(props) => <AppBar auth={auth} {...props} />} />
          <Route path="/game" render={(props) => <Home auth={auth} getUser={this.getUser} setProfile={this.setProfile} profile={profile} setUser={this.setUser} {...props} />} />
          <Route path="/stats" render={(props) => <Stats auth={auth} user={user} allUser={allUsers} profile={profile} {...props} />} />
          <Route path="/profile" render={(props) => (
            !auth.isAuthenticated() ? (
              <Redirect to="/game"/>
            ) : (
              <Profile auth={auth} {...props} />
            )
          )} />
          <Route path="/callback" render={(props) => {
            this.handleAuthentication(props);
            return <Callback {...props} />
          }}/>
        </div>
      </Router>
    )
  }
}

export default App
