import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import { Typography } from '../../../node_modules/@material-ui/core';
import CardMedia from '@material-ui/core/CardMedia';
// import Paper from '@material-ui/core/Paper';

const styles = theme => ({
title: {
  color: "white",
  fontFamily: "VT323",
  fontSize: "22px"
},
info: {
  backgroundColor: "black",
  textAlign: "center",
  width: "1000px",
  margin: "0 auto",
  marginTop: "50px"
},
pic: {
  width: "200px",
  height: "200px"
},
text: {
  color: "grey",
  fontFamily: "VT323",
  fontSize: "18px"
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
      <Card className={classes.info}>
      <div>
        <Typography className={classes.title}> WELCOME {profile.name} !!!</Typography>
        <img className={classes.pic} src={profile.picture} alt="profile"/>
      </div>
          <Typography className={classes.text}>
          You have found yourself in the *MidWaste*, a post apocalyptic world scattered with zombies, previously known as "Kansas". <br/>
          Your main objective is *SURVIVAL*. Connect with other survivors and work together to improve the conditions of your immediate area.<br/>
          Gather supplies, powerups and other items to improve the liklihood you and your team see tomorrow. 
          </Typography>
      </Card>
    );
  }
}

export default withStyles(styles)(Profile);
