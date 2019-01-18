import React, { Component } from 'react'
import { withStyles } from '@material-ui/core/styles'
import Paper from '@material-ui/core/Paper'
import Grid from '@material-ui/core/Grid'
import UserStats from './UserStats'
import StatsBreakdown from './StatsBreakdown'
import AddFriends from './AddFriends'
import FriendOneComp from './FriendOneComp'
import FriendTwoComp from './FriendTwoComp'

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
          <UserStats />
          <StatsBreakdown />
          <AddFriends />
          <FriendOneComp />
          <FriendTwoComp />
        </Grid>
      </div>
    </div>
    )
  }
}

export default withStyles(styles)(Stats)
