import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles'
import { Typography, Card } from '../../../node_modules/@material-ui/core';
import Paper from '@material-ui/core/Paper';

const styles = theme => ({
  root: {
    margin: "0 auto",
    textAlign: "center",
    width: "1000px",
    marginTop: "50px",
    backgroundColor: "black"
  },
  text: {
    fontFamily: "VT323",
    fontSize: "18px",
    color: "grey"
  },
  name: {
    fontSize: "20px",
    color: "white",
    fontFamily: "VT323"
  },
  image: {
    height: "200px",
    width: "200px"
  },
  tag: {
    backgroundColor: "black"
  }
 
})
class Profile extends Component {
  componentWillMount() {
    this.setState({ profile: {} });
    const { userProfile, getProfile } = this.props.auth;
    if (!userProfile) {
      getProfile((err, profile) => {
        this.setState({ profile });
      });
    } else {
      this.setState({ profile: userProfile });
    }
  }

  render() {
    const { profile } = this.state;
    const { classes } = this.props;
    return (
      <Card className={classes.root}>
        <Typography classname={classes.info}>
        <Typography className={classes.name}> Welcome {profile.name}!!!</Typography>
        <img className={classes.image} src={profile.picture} alt="profile"/>
        </Typography>
        <Paper className={classes.tag}>
          <Typography className={classes.text}>
          You have found yourself in the *MidWaste*, a post apocalyptic world scattered with zombies, previously known as "Kansas".
          Your main objective is *SURVIVAL*. Connect with other survivors and work together to improve the conditions of your immediate surroundings.
          Gather supplies, powerups and other items to improve the likelihood that you and your team see tomorrow. 
          </Typography>
          </Paper>
      </Card>
    );
  }
}

export default withStyles(styles)(Profile);
