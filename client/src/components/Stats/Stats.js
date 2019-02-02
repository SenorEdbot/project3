import React, { Component } from 'react'
import userServices from '../../services/userServices'
import { withStyles } from '@material-ui/core/styles'
import Grid from '@material-ui/core/Grid'
import { UserStats, CompareFriend } from '../../index'
import Typography from '@material-ui/core/Typography';

const styles = theme => ({
  root: {
    flexGrow: "1",
    color: "#fff",
    textAlign: "center",
    marginTop: "10vh"
  },
  container: {
    background: "black",
    margin: "0 auto",
    width: "85%"
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
  },
  title: {
    fontFamily: "VT323",
    color: "white",
    fontSize: "22px"
  }

  
})
class Stats extends Component {
  state = {
    profile: {},
    user: {},
    allUsers: [],
    userToCompare: '',
    secondUserObj: {}
    // totalArray: []
  }
  
  handleChange = e => {
    userServices.getUserByUsername(e.target.value)
      .then(dbUser => {
        console.log('in saving 2nd user', dbUser.data)
        this.setState({ secondUserObj: dbUser.data, userToCompare: e.target.value })
      })
      .catch(err => console.log(err))
  }
  componentWillMount() {
    const { userProfile, getProfile } = this.props.auth
    if (!userProfile) {
      getProfile((err, profile) => {
        userServices.getUserByUsername(profile.nickname)
          .then(user => this.setState({
            user: user.data,
            profile
          }))
      })
    } else {
      userServices.getUserByUsername(userProfile.nickname)
          .then(user => this.setState({
            user: user.data,
            profile: userProfile
          }))
    }
  }

  componentDidMount() {
    userServices.getAllUsers()
      .then(allUsers => this.setState({ allUsers: allUsers.data }))
      .catch(err => console.log(err))
  }

  render() {
    const { classes } = this.props
    const { profile, allUsers, user } = this.state
    console.log({user},  {profile} )
    return (
    <div className={classes.root}>
      <div className={classes.container}>
      {user && !user.maxAccuracy ? <Typography className={classes.title}>Please play the game to generate stats </Typography> : (
        <React.Fragment>
          <Grid
            container
            spacing={16}
            direction="row"
            justify="center"
            alignItems="center"
          >
            <UserStats className={classes.table}
              profile={profile}
              user={user}
            />
            </Grid>
            <Grid
            container
            spacing={16}
            direction="row"
            justify="center"
            alignItems="center"
            style={{marginTop: "20px"}}
          >
            <CompareFriend
              user={user}
              allUsers={allUsers}
              userToCompare={this.state.userToCompare}
              handleChange={this.handleChange}
              />
          </Grid>
        </React.Fragment>
      )}
      </div>
    </div>
    )
  }
}


//UserStats: the player profile with their most recent game data as well
//StatsBreakdown: History AND max for the player/user
//AddFriends: dropdown for selecting a user to compare stats against. Dyanmically load the comparision components that showcase user1 vs selectedUser
export default withStyles(styles)(Stats)
