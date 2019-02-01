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
    // width: '70%',
    marginTop: theme.spacing.unit * 3,
    overflowX: 'auto',
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
  }
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
          <TableRow>
            <TableCell className={classes.title}>{user.name}</TableCell>
            <TableCell className={classes.body}>Recent</TableCell>
            <TableCell className={classes.body}>Best</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          <TableRow>
            <TableCell className={classes.title}>Accuracy</TableCell>
            <TableCell className={classes.body}>{user.recentAccuracy}</TableCell>
            <TableCell className={classes.body}>{user.maxAccuracy}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell className={classes.title}>Difficulty</TableCell>
            <TableCell className={classes.body}> {user.recentDifficulty}</TableCell>
            <TableCell className={classes.body}>{user.maxDifficulty}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell className={classes.title}>EnemiesKilled</TableCell>
            <TableCell className={classes.body}>{user.recentEnemiesKilled}</TableCell>
            <TableCell className={classes.body}>{user.maxEnemiesKilled}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell className={classes.title}>ShotsFired</TableCell>
            <TableCell className={classes.body}>{user.recentShotsFired}</TableCell>
            <TableCell className={classes.body}>{user.maxShotsFired}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell className={classes.title}>TimeSurvived</TableCell>
            <TableCell className={classes.body}>{user.recentTimeSurvived}</TableCell>
            <TableCell className={classes.body}>{user.maxTimeSurvived}</TableCell>
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
