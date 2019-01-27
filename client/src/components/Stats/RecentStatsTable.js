import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';


const styles = theme => ({
  root: {
    width: '100%',
    marginTop: theme.spacing.unit * 3,
    overflowX: 'auto',
  },
  table: {
    minWidth: 700,
  },
});


function SimpleTable(props) {


  const { classes, user, profile } = props;

  return (
    <Paper className={classes.root}>
      <Table className={classes.table}>
        <TableHead>
          <TableRow>
            <TableCell></TableCell>
            <TableCell numeric>Time Survived (Secs)</TableCell>
            <TableCell numeric>Difficulty</TableCell>
            <TableCell numeric>Enemies Killed</TableCell>
            <TableCell numeric>Shots Fired</TableCell>
            <TableCell numeric>Accuracy</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          <TableRow>
            <TableCell component="th" scope="row">
              Recent
            </TableCell>
            <TableCell numeric>{user.recentTimeSurvived}</TableCell>
            <TableCell numeric>{user.recentDifficulty}</TableCell>
            <TableCell numeric>{user.recentEnemiesKilled}</TableCell>
            <TableCell numeric>{user.recentShotsFired}</TableCell>
            <TableCell numeric>{user.recentAccuracy}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell component="th" scope="row">
              Best
            </TableCell>
            <TableCell numeric>{user.maxTimeSurvived}</TableCell>
            <TableCell numeric>{user.maxDifficulty}</TableCell>
            <TableCell numeric>{user.maxEnemiesKilled}</TableCell>
            <TableCell numeric>{user.maxShotsFired}</TableCell>
            <TableCell numeric>{user.maxAccuracy}</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </Paper>
  );
}

SimpleTable.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(SimpleTable);
