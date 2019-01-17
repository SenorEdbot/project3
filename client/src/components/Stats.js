import React, { Component } from 'react'
import { withStyles } from '@material-ui/core/styles'
import Paper from '@material-ui/core/Paper'
import Grid from '@material-ui/core/Grid'

const styles = theme => ({
  root: {
    flexGrow: "1",
    color: "#fff",
    textAlign: "center"
  },
  container: {
    background: "#424242",
    margin: "0 auto",
    width: "80%"
  },
  title: {
    color: "#383722",
    textAlign: 'center',
    padding: theme.spacing.unit * 2,
  },
  stats: {
    color: "#440202",
    textAlign: "center",
    padding: theme.spacing.unit * 2,
  },
  friends: {
    color: "#222281",
    padding: theme.spacing.unit * 2
  }
})
class Stats extends Component {
  render() {
    const { classes, user } = this.props

    //----------------------------------------------------------------------------
    // Note (remove later):
    // User stats retrieved from db is available inside 'user' or 'this.props.user'
    console.log('User stats', user)
    //----------------------------------------------------------------------------

    return (
    <div className={classes.root}>
      <div className={classes.container}>
        <Grid
          container
          spacing={16}
          className={classes.conatiner}
          direction="row"
          justify="center"
          alignItems="center"
        >
          <Grid item xs={12}>
            <Paper className={classes.title}>Hello World</Paper>
          </Grid>
          <Grid item xs={12}>
            <Paper className={classes.stats}>Stats Breakdown</Paper>
          </Grid>
          <Grid item xs={12}>
            <Paper className={classes.friends}>Add Friends</Paper>
          </Grid>
          <Grid item xs={6}>
            <Paper className={classes.friends}>Add Friends</Paper>
          </Grid>
          <Grid item xs={6}>
            <Paper className={classes.friends}>Add Friends</Paper>
          </Grid>
        </Grid>
      </div>
    </div>
    )
  }
}

export default withStyles(styles)(Stats)
