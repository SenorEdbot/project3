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
    width: '70%',
    marginTop: theme.spacing.unit * 3,
    overflowX: 'auto',
    backgroundColor: "black"
  },
  title: {
    color: "white",
    fontFamily: "VT323",
    fontSize: "20px",  
},
body: {
    color: "grey",
    fontSize: "18px",
    fontFamily: "VT323"
  },
  table: {
    backgroundColor: "black",
    padding: "10px"
  },
 
  // table: {
  //   minWidth: 700,
  // },
});

function FriendStatsTable(props) {
  const { classes, user } = props;

  return (
    <Paper className={classes.root}>
      <Table className={classes.table}>
        <TableHead>
          <TableRow className={classes.title}>
            <TableCell className={classes.title}>Recent</TableCell>
            <TableCell className={classes.title} numeric>Recent Accuracy</TableCell>
            <TableCell className={classes.title} numeric>Recent Difficulty</TableCell>
            <TableCell className={classes.title} numeric>Recent Enemies Killed</TableCell>
            <TableCell className={classes.title} numeric>Recent Shots Fired</TableCell>
            <TableCell className={classes.title} numeric>Recent Accuracy</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          <TableRow>
            <TableCell component="th" scope="row">
              {user.name}
            </TableCell>
            <TableCell className={classes.body} numeric>{user.recentTimeSurvived}</TableCell>
            <TableCell className={classes.body} numeric>{user.recentDifficulty}</TableCell>
            <TableCell className={classes.body} numeric>{user.recentEnemiesKilled}</TableCell>
            <TableCell className={classes.body} numeric>{user.recentShotsFired}</TableCell>
            <TableCell className={classes.body} numeric>{user.recentAccuracy}</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </Paper>
  );
}

FriendStatsTable.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(FriendStatsTable);
