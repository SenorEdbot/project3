import React, { Component } from 'react'
import { withStyles } from '@material-ui/core/styles'
import Grid from '@material-ui/core/Grid'
import Paper from '@material-ui/core/Paper'
import Avatar from '@material-ui/core/Avatar'
import Typography from '@material-ui/core/Typography'
import ButtonBase from '@material-ui/core/ButtonBase'
import Tabs from '@material-ui/core/Tabs'
import Tab from '@material-ui/core/Tab'
import RecentStatsTable from './RecentStatsTable'
import HistoricalStatsTable from './HistoricalStatsTable'
import GameHistory1 from './GameHistory1'
import Graph from './Graph'

const styles = theme => ({
  root: {
    flexGrow: "1"
  },
  title: {
    color: "#383722",
    textAlign: 'center',
    padding: theme.spacing.unit * 2,
  },
  bigAvatar: {
    width: 128,
    height: 128,
    borderRadius: 0
  },
  paper: {
    padding: theme.spacing.unit * 2,
    margin: 'auto',
    backgroundColor: "black",
    marginTop: "30px"
  },
  image: {
    width: 128,
    height: 128,
  },
  img: {
    margin: 'auto',
    display: 'block',
    maxWidth: '100%',
    maxHeight: '100%',
  },
  name: {
    color: "white",
    fontSize: "20px",
    fontFamily: "VT323"
  },
  tab: {
    color: "grey",
    fontFamily: "VT323",
    fontSize: "22px"
  },
  choice: {
    color: "#fe3e3e"
  },
  table: {
    backgroundColor: "#424242",
  }
})

class UserStats extends Component {
  state = {
    value: 0,
    totalAcc: 0,
		totalDif: 0,
		totalKia: 0,
		totalShots: 0,
		totalSurv: 0
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

	componentDidMount() {
		if (this.props.user && this.props.user.maxAccuracy) {
			this.totalAcc()
			this.totalDif()
			this.totalKia()
			this.totalShots()
			this.totalSurv()
		}
	}

  handleChange = (event, value) => {
    this.setState({ value });
  }
  render (){
    const { classes, profile, user } = this.props
    const { value } = this.state
    console.log({ user }, { profile })
    return(
      <Paper className={classes.paper}>
        <Grid container spacing={16}>
          <Grid item xs={12} sm container>
            <Grid item>
              <ButtonBase className={classes.image}>
                <Avatar alt="profile picture" src={profile.picture} className={classes.bigAvatar} />
              </ButtonBase>
            </Grid>
            <Grid item xs container direction="column" spacing={16}>
              <Grid item xs>
                <Typography className={classes.name} gutterBottom variant="subtitle1">
                  {profile.name}
                </Typography>
                <Typography className={classes.name} gutterBottom>Username: {user.name}</Typography>
              </Grid>
              <Grid item xs>
                <Tabs
                  value={this.state.value}
                  onChange={this.handleChange}
                  // indicatorColor={classes.choice}
                  // textColor={classes.choice}
                  centered
                  className={classes.choice}
                >
                  <Tab className={classes.tab} label="Graphs" />
                  <Tab className={classes.tab} label="Previous" />
                  <Tab className={classes.tab} label="Career" />
                  <Tab className={classes.tab} label="History" />
                </Tabs>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
        <Grid item>
          {value === 0 && <Graph user={user} />}
          {value === 1 && <RecentStatsTable user={user} totalAcc={this.state.totalAcc} totalDif={this.state.totalDif} totalKia={this.state.totalKia} totalShots={this.state.totalShots} totalSurv={this.state.totalSurv} />}
          {value === 2 && <HistoricalStatsTable user={user} totalAcc={this.state.totalAcc} totalDif={this.state.totalDif} totalKia={this.state.totalKia} totalShots={this.state.totalShots} totalSurv={this.state.totalSurv} />}
          {value === 3 && <GameHistory1 user={user} />}
        </Grid>
      </Paper>
    )
  }
}

export default withStyles(styles)(UserStats)

// <Grid item>
//   <Typography style={{ cursor: 'pointer' }}>Add Friend</Typography>
// </Grid>