import React, { Component } from 'react';
import Game from './game';
import { withStyles } from '@material-ui/core/styles'


const styles = theme => ({
    root: {
      margin: "0 auto",
      color: "white"
    },
    container: {
    margin: "0 auto",
    },
    text: {
      textAlign: "center",
      fontFamily: "VT323"
    }
})
export class Home extends Component {
  login() {
    this.props.auth.login();
  }

  render() {
    const { isAuthenticated } = this.props.auth;
    const {classes} = this.props;
    return (
      <div className={classes.root}>
        {
          isAuthenticated() && (
            <div className={classes.container}>
              <Game auth={this.props.auth} getUser={this.props.getUser}/>
            </div>
          )
        }
        {
          !isAuthenticated() && (
            <h4 className={classes.text}>
              You are not logged in! Please{' '}
              <div
                style={{ cursor: 'pointer' }}
                onClick={this.login.bind(this)}
              >Log in</div>
              {' '}to continue.
            </h4>
          //    <div className={classes.container}>
          //    <h4 className={classes.text}>
          //      You are not logged in! Please{' '}
          //      <div
          //        style={{ cursor: 'pointer' }}
          //        onClick={this.login.bind(this)}
          //      >Log in</div>
          //      {' '}to continue.
          //    </h4>
          //    <Game />
          //  </div>
          )
        }
      </div>
    )
  }
}

export default withStyles(styles)(Home)
