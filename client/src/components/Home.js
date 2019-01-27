import React, { Component } from 'react';
import Game from './game';
import { withStyles } from '@material-ui/core/styles'
import Card from '@material-ui/core/Card';
import { Typography } from '../../node_modules/@material-ui/core';
import CardMedia from '@material-ui/core/CardMedia';

const styles = theme => ({
  root: {
    margin: "0 auto",
    color: "white"
  },
  container: {
    margin: "0 auto",
  },
  landing: {
    textAlign: "center",
    fontFamily: "VT323",
    width: "1000px",
    margin: "0 auto",
    marginTop: "50px",
    backgroundColor: "black",
    
  },
  text: {
    fontFamily: "VT323",
    fontSize: "16px",
    color: "grey",
    fontSize: "18px"
  },
  media: {
    height: "300px",
    width: "100%",
    padding: "20px",
    marginLeft: "20px",
    imageAlign: "center"
  },
  title: {
    fontSize: "20px",
    color: "white",
    fontFamily: "VT323"
  }
})
export class Home extends Component {
  login() {
    this.props.auth.login();
  }

  render() {
    const { isAuthenticated } = this.props.auth;
    const { classes } = this.props;
    return (
      <div className={classes.root}>
        {
          isAuthenticated() && (
            <div className={classes.container}>
              <Game auth={this.props.auth} getUser={this.props.getUser} />
            </div>
          )
        }
        {
          !isAuthenticated() && (
            <Card className={classes.landing}>
                  <CardMedia
                    className={classes.media}
                    image="../assets/images/midwaste1.png"
                    title="midwaste1.png"
                  />
                    <Typography className={classes.text}>
                   Welcome to: 
                              <Typography className={classes.title}>
                                  MidWaste
                              </Typography>
                    Please Log In to Continue.
                     </Typography>

                     <Typography className={classes.intro}>

                     </Typography>
            </Card>
          )
        }
      </div>
    )
  }
}

export default withStyles(styles)(Home)
