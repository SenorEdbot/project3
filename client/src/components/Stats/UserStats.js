import React from 'react'
import { withStyles } from '@material-ui/core/styles'
import Grid from '@material-ui/core/Grid'
import Paper from '@material-ui/core/Paper'
import Avatar from '@material-ui/core/Avatar'
import Typography from '@material-ui/core/Typography'
import ButtonBase from '@material-ui/core/ButtonBase'
import RecentStatsTable from './RecentStatsTable'

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
    margin: 'auto'
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
  }
})

function UserStats(props) {
  const { classes, profile, user } = props
  console.log({ user },{ profile })
  return (
    <Paper className={classes.paper}>
      <Grid container spacing={16}>
        <Grid item>
          <ButtonBase className={classes.image}>
          <Avatar alt="profile picture" src={profile.picture} className={classes.bigAvatar} />
          </ButtonBase>
        </Grid>
        <Grid item xs={12} sm container>
          <Grid item xs container direction="column" spacing={16}>
            <Grid item xs>
              <Typography gutterBottom variant="subtitle1">
                {profile.name}
              </Typography>
              <Typography gutterBottom>{user.name}</Typography>
            </Grid>
            <Grid item>
              <RecentStatsTable 
              user={user}
              profile={profile} />
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Paper>
  )
}

export default withStyles(styles)(UserStats)

// <Grid item>
//   <Typography style={{ cursor: 'pointer' }}>Add Friend</Typography>
// </Grid>