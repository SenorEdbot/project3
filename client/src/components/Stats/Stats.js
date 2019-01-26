import React, { Component } from 'react'
import userServices from '../../services/userServices'
import { withStyles } from '@material-ui/core/styles'
import Grid from '@material-ui/core/Grid'
import Paper from '@material-ui/core/Paper'
import Typography from '@material-ui/core/Typography'
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
  // componentWillMount() {
  //   const { userProfile, getProfile } = this.props.auth
  //   console.log(this.props.auth)
  //   if (!userProfile) {
  //     getProfile((err, profile) => {
  //       this.setState({ profile: profile })
  //     })
  //   } else {
  //     this.setState({ profile: userProfile })
  //   }
  // }
  // componentDidMount() {
  //   userServices.getAllUsers()
  //     .then(allUsers => this.setState({ allUsers: allUsers.data }))
  //     .catch(err => console.log(err))

  //   userServices.getUserByUsername(this.props.user.name) 
  //     .then(dbUser => this.setState({ user: dbUser.data }))
  //     .catch(err => console.log(err))
  // }

  render() {
    const { classes, allUsers, profile } = this.props
    // const { profile } = this.state
    //----------------------------------------------------------------------------
    // TODO: (remove later):
    // User stats retrieved from db is available inside 'user' or 'this.props.user'
    // console.log({ user })
    //----------------------------------------------------------------------------

    return (
    <div className={classes.root}>
      <div className={classes.container}>
      {/* {!allUsers[0].maxShotsFired ? (
        <Paper className={classes.root} elevation={1}>
          <Typography variant="h5" component="h3">
            You do not have any stats.
          </Typography>
          <Typography component="p">
            Please play the game first
          </Typography>
      </Paper>
      ) : (
        <Grid
          container
          spacing={16}
          direction="row"
          justify="center"
          alignItems="center"
        >
          <UserStats
            profile={profile}
             />
          <StatsBreakdown
            profile={profile}
             />
          <AddFriends
            allUsers={allUsers} />
          <FriendOneComp
          profile={profile}
           />
          <FriendTwoComp 
          profile={profile}
          
          />
        </Grid>
        )} */}
        <Grid
          container
          spacing={16}
          direction="row"
          justify="center"
          alignItems="center"
        >
          <UserStats
            profile={profile}
             />
          <StatsBreakdown
            profile={profile}
             />
          <AddFriends
            allUsers={allUsers} />
          <FriendOneComp
          profile={profile}
           />
          <FriendTwoComp 
          profile={profile}
          
          />
        </Grid>
      </div>
    </div>
    )
  }
}

export default withStyles(styles)(Stats)
