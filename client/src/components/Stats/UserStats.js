import React from 'react'
import { withStyles } from '@material-ui/core/styles'
import Grid from '@material-ui/core/Grid'
import Avatar from '@material-ui/core/Avatar'
import Paper from '@material-ui/core/Paper'
import Typography from '@material-ui/core/Typography'
import ButtonBase from '@material-ui/core/ButtonBase'

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
    margin: 10,
    width: 60,
    height: 60,
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
            <Avatar alt={profile.name} src={profile.picture} className={classes.bigAvatar} />
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
              <Typography style={{ cursor: 'pointer' }}>Add Friend</Typography>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Paper>
  )
}

export default withStyles(styles)(UserStats)
