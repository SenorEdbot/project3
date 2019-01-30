import React, { Component } from 'react';
import '../App.css';
import { withStyles } from '@material-ui/core/styles'
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';

const styles = theme => ({
  appbar: {
    backgroundColor: "black",
    color: "grey"
  },
  button: {
    color: "grey",
    fontFamily: "VT323",
    "&:hover": {
      color: "white"
    }
  },
  flex: {
    marginLeft: "80%",
    fontFamily: "VT323",
  }
})

class Header extends Component {
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
    const {classes} = this.props;

    return (
      <div className={classes.root}>
        <div className={classes.container}>
          <AppBar className={classes.appbar} position="static">
            <Toolbar>
            <Button className={classes.button}onClick={this.goTo.bind(this, 'home')}>
              Home
            </Button>
            {
              !isAuthenticated() && (
                  <Button className={classes.button}onClick={this.login.bind(this)}>
                    Log In
                  </Button>
                )
            }
            {
              isAuthenticated() && (
                <Button className={classes.button} onClick={this.goTo.bind(this, 'profile')}>
                  Info
                </Button>
              )
            }
            {
              isAuthenticated() && (
                <Button className={classes.button} onClick={this.goTo.bind(this, 'stats')}>
                  Stats
                </Button>
              )
            }
            {
              isAuthenticated() && (
                  <Button className={classes.button} onClick={this.logout.bind(this)}>
                    Log Out
                  </Button>
                )
            }
            <Typography variant="title" color="inherit" className={classes.flex}>
            MidWaste
            </Typography>
                  </Toolbar>
              </AppBar>
            </div>
      </div>
    );
  }
}

export default withStyles(styles)(Header);
