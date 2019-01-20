import React, { Component } from 'react'
import { withStyles } from '@material-ui/core/styles'
import Paper from '@material-ui/core/Paper'
import Grid from '@material-ui/core/Grid'
import Avatar from '@material-ui/core/Avatar';
import UserStats from './UserStats'
import StatsBreakdown from './StatsBreakdown'
import AddFriends from './AddFriends'
import FriendOneComp from './FriendOneComp'
import FriendTwoComp from './FriendTwoComp'

const styles = theme => ({
  root: {
    flexGrow: "1",
    color: "#fff",
    textAlign: "center",
    marginTop: "10vh"
  },
  container: {
    background: "#424242",
    margin: "0 auto",
    width: "80%"
  },
  stats: {
    color: "#440202",
    textAlign: "center",
    padding: theme.spacing.unit * 2,
  },
  bigAvatar: {
    margin: 10,
    width: 60,
    height: 60,
  }
})
class Stats extends Component {
  state = {
    profile: {}
  }
  componentWillMount() {
    const { userProfile, getProfile } = this.props.auth
    if (!userProfile) {
      getProfile((err, profile) => {
        this.setState({ profile: userProfile })
      })
    } else {
      this.setState({ profile: userProfile })
    }
  }

  render() {
    const { classes, user } = this.props
    const { profile } = this.state
    //----------------------------------------------------------------------------
    // TODO: (remove later):
    // User stats retrieved from db is available inside 'user' or 'this.props.user'
    console.log({ user })
    //----------------------------------------------------------------------------

    return (
    <div className={classes.root}>
      <div className={classes.container}>
        <Grid
          container
          spacing={16}
          direction="row"
          justify="center"
          alignItems="center"
        >
          {/* <Grid item xs={12}>
            <Paper className={classes.stats}>{this.state.profile.name}</Paper>
          </Grid> */}
          <UserStats
            profile={profile}
            user={user} />
          <StatsBreakdown
            profile={profile}
            user={user} />
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
