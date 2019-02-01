import React from 'react';
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
    backgroundColor: "black"
  },
  title: {
    color: "white",
    fontFamily: "VT323",
    fontSize: "20px"
  },
  body: {
    color: "grey",
    fontSize: "18px",
    fontFamily: "VT323"
  }
});

function SimpleTable(props) {
  const { classes, user } = props;

  return (
    <Paper className={classes.root}>
      <Table className={classes.table}>
        <TableHead>
          <TableRow className={classes.title}>
            <TableCell></TableCell>
            <TableCell className={classes.title} align="center">Enemies Killed</TableCell>
            <TableCell className={classes.title} align="center">Shots Fired</TableCell>
            <TableCell className={classes.title} align="center">Accuracy</TableCell>
            <TableCell className={classes.title} align="center">Time Survived (Secs)</TableCell>
            <TableCell className={classes.title} align="center">Difficulty</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          <TableRow>
            <TableCell className={classes.title}component="th" scope="row">
              Previous
            </TableCell>
            <TableCell className={classes.body} align="center">{user.recentEnemiesKilled}</TableCell>
            <TableCell className={classes.body} align="center">{user.recentShotsFired}</TableCell>
            <TableCell className={classes.body} align="center">{(user.recentAccuracy).toFixed(1)}%</TableCell>
            <TableCell className={classes.body} align="center">{user.recentTimeSurvived}</TableCell>
            <TableCell className={classes.body} align="center">{user.recentDifficulty}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell className={classes.title}component="th" scope="row">
              Best
            </TableCell>
            <TableCell className={classes.body} align="center">{user.maxEnemiesKilled}</TableCell>
            <TableCell className={classes.body} align="center">{user.maxShotsFired}</TableCell>
            <TableCell className={classes.body} align="center">{(user.maxAccuracy).toFixed(1)}%</TableCell>
            <TableCell className={classes.body} align="center">{user.maxTimeSurvived}</TableCell>
            <TableCell className={classes.body} align="center">{user.maxDifficulty}</TableCell>
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
