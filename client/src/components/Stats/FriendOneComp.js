import React from 'react'
import { withStyles } from '@material-ui/core/styles'
import Grid from '@material-ui/core/Grid'
import Paper from '@material-ui/core/Paper'
import FriendOneStatsTable from './FriendOneStatsTable';

const styles = theme => ({
  root: {
    flexGrow: "1"
  },
  friends: {
    color: "#222281",
    padding: theme.spacing.unit * 2
  }
})

function FriendOneComp(props) {
  const { classes, user } = props
  return (
    <Grid item xs={6} sm container>
      <Grid item>
        <FriendOneStatsTable
          user={user}
        />
      </Grid>
    </Grid>
  )
}

export default withStyles(styles)(FriendOneComp)