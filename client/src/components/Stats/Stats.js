import React, { Component } from 'react'
import userServices from '../../services/userServices'
import { withStyles } from '@material-ui/core/styles'
import Grid from '@material-ui/core/Grid'
import { UserStats, StatsBreakdown, AddFriends, FriendOneComp, FriendTwoComp } from '../../index'

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
    user: {},
    allUsers: [],
    userToCompare: '',
    secondUserObj: {},
    totalAcc: 0,
    totalDif: 0,
    totalKia: 0,
    totalShots: 0,
    totalSurv: 0
    // totalArray: []
  }
  
  reducer = (accumulator, currentValue) => accumulator + currentValue;

  totalAcc = () => {
    let totalAccuracy = this.props.user.historyAccuracy.reduce(this.reducer)
    this.setState({
      totalAcc: totalAccuracy
    })

  }
  totalDif = () => {
    let totalDifficulty = this.props.user.historyDifficulty.reduce(this.reducer)
    this.setState({
      totalDif: totalDifficulty
    })

  }
  totalKia = () => {
    let totalEnemiesKilled = this.props.user.historyEnemiesKilled.reduce(this.reducer)
    this.setState({
      totalKia: totalEnemiesKilled
    })

  }
  totalShots = () => {
    let totalShotsFired = this.props.user.historyShotsFired.reduce(this.reducer)
    this.setState({
      totalShots: totalShotsFired
    })

  }
  totalSurv = () => {
    let totalTimeSurvived = this.props.user.historyTimeSurvived.reduce(this.reducer)
    this.setState({
      totalSurv: totalTimeSurvived
    })

  }
  // wanting to pass in this.user.historyX
  // totalX = (x) => {
  //   let total = x.reduce(this.reducer)
  //   this.setState({ totalArray: [...this.state.totalArray, total] })

  // }
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
        this.setState({ profile: profile })
      })
    } else {
      this.setState({ profile: userProfile })
    }
  }

  componentDidMount() {
    userServices.getAllUsers()
      .then(allUsers => this.setState({ allUsers: allUsers.data }))
      .catch(err => console.log(err))

    this.totalAcc()
    this.totalDif()
    this.totalKia()
    this.totalShots()
    this.totalSurv()

    // for (let i=0; i<5; i++) {

    //   this.totalX(this.props.user.historyAccuracy)
    //   this.totalX(this.props.user.historyDifficulty)
    //   this.totalX(this.props.user.historyEnemiesKilled)
    //   this.totalX(this.props.user.historyShotsFired)
    //   this.totalX(this.props.user.historyTimeSurvived)
    // }
  }

  render() {
    const { classes, user } = this.props
    const { profile, allUsers, totalAcc, totalDif, totalKia, totalShots, totalSurv } = this.state
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
            user={user}
            totalAcc={totalAcc}
            totalDif={totalDif}
            totalKia={totalKia}
            totalShots={totalShots}
            totalSurv={totalSurv} />
          <AddFriends
            allUsers={allUsers}
            userToCompare={this.state.userToCompare}
            handleChange={this.handleChange}
           />
           {this.state.secondUserObj.name ? (
             <React.Fragment>
              <FriendOneComp
                user={user} />
              <FriendTwoComp
                user={this.state.secondUserObj} />
             </React.Fragment>
           ) : ("")}
        </Grid>
      </div>
    </div>
    )
  }
}


//UserStats: the player profile with their most recent game data as well
//StatsBreakdown: History AND max for the player/user
//AddFriends: dropdown for selecting a user to compare stats against. Dyanmically load the comparision components that showcase user1 vs selectedUser
export default withStyles(styles)(Stats)
