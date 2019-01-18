import React from 'react'
import { withStyles } from '@material-ui/core/styles'
import Grid from '@material-ui/core/Grid'
import Paper from '@material-ui/core/Paper'

const styles = theme => ({
  root: {
    flexGrow: "1"
  },
  title: {
    color: "#383722",
    textAlign: 'center',
    padding: theme.spacing.unit * 2,
  }
})

function UserStats(props) {
  const { classes } = props
  return (
    <Grid item xs={12}>
      <Paper className={classes.title}>Hello World</Paper>
    </Grid>
  )
}

export default withStyles(styles)(UserStats)
