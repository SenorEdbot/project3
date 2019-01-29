import React from 'react'
import { withStyles } from '@material-ui/core/styles'
import Grid from '@material-ui/core/Grid'
// import Paper from '@material-ui/core/Paper'
// import FriendStatsTable from './FriendStatsTable';
import FriendStatsTable1 from './FriendStatsTable1';

const styles = theme => ({
  root: {
    flexGrow: "1"
  },
  friends: {
    color: "#222281",
    padding: theme.spacing.unit * 2
  }
})

function FriendComp(props) {
  const { user } = props
  // Deleted classes out props because it was unused
  return (
    <Grid item xs={6}>
      <FriendStatsTable1
        user={user}
      />
    </Grid>
  )
}

export default withStyles(styles)(FriendComp)
