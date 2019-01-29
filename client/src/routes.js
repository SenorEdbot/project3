import React from 'react';
import { Redirect, Route, Router } from 'react-router-dom';
import Header from './components/Header';
import Home from './components/Home';
import Stats from './components/Stats/Stats';
import Profile from './components/Profile/Profile';
import Callback from './Callback/Callback';
import Auth from './Auth/Auth';
import history from './history';

const auth = new Auth();
let currentUser = null;

const handleAuthentication = ({location}) => {
  if (/access_token|id_token|error/.test(location.hash)) {
    auth.handleAuthentication();
  }
}

const getUser = (user) => {
  // TODO: refactor
  console.log(`Data retrieved for: ${user.name}`, user);
  currentUser = user;
}

export const makeMainRoutes = () => {
  return (
      <Router history={history}>
        <div>
          <Route path="/" render={(props) => <Header auth={auth} {...props} />} />
          <Route path="/home" render={(props) => <Home auth={auth} getUser={getUser} {...props} />} />
          <Route path="/stats" render={(props) => <Stats auth={auth} getUser={getUser} user={currentUser} {...props} />} />
          <Route path="/profile" render={(props) => (
            !auth.isAuthenticated() ? (
              <Redirect to="/home"/>
            ) : (
              <Profile auth={auth} {...props} />
            )
          )} />
          <Route path="/callback" render={(props) => {
            handleAuthentication(props);
            return <Callback {...props} />
          }}/>
        </div>
      </Router>
  );
}
