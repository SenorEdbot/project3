import React, { Component } from 'react';
import Game from './game';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import { Typography, Grid } from '../../node_modules/@material-ui/core';
import CardMedia from '@material-ui/core/CardMedia';
import Paper from '@material-ui/core/Paper';



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
  },
  info: {
    marginTop: "30px",
    backgroundColor: "black",
    color: "white",
    fontFamily: "VT323",
    justify: "left"
  }
})
export class Home extends Component {
  login() {
    this.props.auth.login();
  }

  render() {
    const { isAuthenticated } = this.props.auth;
    const { classes } = this.props;
    const bull = <span className={classes.bullet}>*</span>;
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
                  {bull} MidWaste {bull}
                </Typography>
                Please Log In to Continue.
                              </Typography>
            <Grid container spacing={24}>
            <Grid item xs={6}>
              <Paper className={classes.info} elevation={1}>
                <Typography className={classes.title} variant="h5" component="h3">
                  What's new:
                </Typography>
                <Typography className={classes.text} component="p">
                  {bull} Quick Pre-game tutorial displaying HUD and move/shoot controls. <br/>
                  {bull} Randomly Selected Weapons, Pistol OR Shotgun. <br />
                  {bull} Randomly Selected Difficulty: <br/>
                  1 = 100 Zombies, 2 = 200 Zombies, ETC... <br/>
                  {bull} Randomly Assigned Game Mode: <br/>
                  {bull}{bull}{bull}Purge:{bull}{bull}{bull} <br/>
                  Destroy all Zombies to complete mission! <br/>
                  {bull}{bull}{bull}Survival:{bull}{bull}{bull} <br/>
                  Constant Waves of Zombies, Survive as long as you can!
                  </Typography>
              </Paper>
              </Grid>
              <Grid item xs={6}>
              <Paper className={classes.info} elevation={1}>
                <Typography className={classes.title} variant="h5" component="h3">
                  Coming Soon:
                </Typography>
                <Typography className={classes.text} component="p">
                  {bull} Multi Player Gameplay <br/>
                  {bull} Add Friends<br />
                  {bull} User Selected Game Modes <br/>
                  {bull} Additional Game Modes <br/>
                  {bull} In Game Improvements, Power Ups and More Interaction! <br/>
                  {bull} Chat/Voice functionality<br/>
                  </Typography>
              </Paper>
              </Grid>
              </Grid>
            </Card>

          )
        }
      </div>
    )
  }
}

export default withStyles(styles)(Home)
