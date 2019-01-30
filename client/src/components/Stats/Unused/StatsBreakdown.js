import React from 'react'
import { withStyles } from '@material-ui/core/styles'
import Grid from '@material-ui/core/Grid'
// import Paper from '@material-ui/core/Paper'
import HistoricalStatsTable from '../UserStats/HistoricalStatsTable'

const styles = theme => ({
  root: {
    flexGrow: "1"
  },
  title: {
    color: "#383722",
    textAlign: 'center',
    padding: theme.spacing.unit * 2,
  },
  stats: {
    color: "#440202",
    textAlign: "center",
    padding: theme.spacing.unit * 2,
  }
})

function StatsBreakdown(props) {
  const { profile, user, totalAcc, totalDif, totalKia, totalShots, totalSurv } = props
  console.log({ user }, { profile })

  return (
    <Grid container spacing={16}>
      <Grid item>
        <HistoricalStatsTable
          user={user}
          profile={profile}
          totalAcc={totalAcc}
          totalDif={totalDif}
          totalKia={totalKia}
          totalShots={totalShots}
          totalSurv={totalSurv} />
      </Grid>
    </Grid>

  )
}

export default withStyles(styles)(StatsBreakdown)
