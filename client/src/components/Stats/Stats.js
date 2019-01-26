import React, { Component } from 'react'
import userServices from '../../services/userServices'
import { withStyles } from '@material-ui/core/styles'
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
    profile: {},
    allUsers: []
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

  componentDidMount() {
    userServices.getAllUsers()
      .then(allUsers => this.setState({ allUsers: allUsers.data }))
      .catch(err => console.log(err))
  }

  render() {
    const { classes, user } = this.props
    const { profile, allUsers } = this.state
    //----------------------------------------------------------------------------
    // TODO: (remove later):
    // User stats retrieved from db is available inside 'user' or 'this.props.user'
    console.log({ user })
    console.log(this.state.allUsers)
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
          <AddFriends
            allUsers={allUsers} />
          <FriendOneComp
          profile={profile}
          user={user} />
          <FriendTwoComp 
          profile={profile}
          user={user}
          />
        </Grid>
      </div>
    </div>
    )
  }
}

export default withStyles(styles)(Stats)
