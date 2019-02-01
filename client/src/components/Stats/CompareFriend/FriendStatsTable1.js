import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';

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
  },
  name: {
    color: "white",
    fontFamily: "VT323",
    fontSize: "22px"
  },
  otherName: {
    backgroundColor: "black"
  }
  // table: {
  //   minWidth: 700,
  // },
});

function FriendStatsTable(props) {
  const { classes, user } = props;

  return (
    <Paper className={classes.root}>
    <Toolbar className={classes.otherName}>
        <Typography className={classes.name} variant="h6" id="tableTitle" align="right">
          {user.name}
        </Typography>
      </Toolbar>
      <Table className={classes.table}>
        <TableHead>
          <TableRow>
            <TableCell></TableCell>
            <TableCell className={classes.title} align="center">Recent</TableCell>
            <TableCell className={classes.title} align="center">Best</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          <TableRow>
            <TableCell className={classes.title} align="left">EnemiesKilled</TableCell>
            <TableCell className={classes.body} align="center">{user.recentEnemiesKilled}</TableCell>
            <TableCell className={classes.body} align="center">{user.maxEnemiesKilled}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell className={classes.title} align="left">ShotsFired</TableCell>
            <TableCell className={classes.body} align="center">{user.recentShotsFired}</TableCell>
            <TableCell className={classes.body} align="center">{user.maxShotsFired}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell className={classes.title} align="left">Accuracy</TableCell>
            <TableCell className={classes.body} align="center">{(user.recentAccuracy).toFixed(1)}%</TableCell>
            <TableCell className={classes.body} align="center">{(user.maxAccuracy).toFixed(1)}%</TableCell>
          </TableRow>
          <TableRow>
            <TableCell className={classes.title} align="left">TimeSurvived</TableCell>
            <TableCell className={classes.body} align="center">{user.recentTimeSurvived}</TableCell>
            <TableCell className={classes.body} align="center">{user.maxTimeSurvived}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell className={classes.title} align="left">Difficulty</TableCell>
            <TableCell className={classes.body} align="center"> {user.recentDifficulty}</TableCell>
            <TableCell className={classes.body} align="center">{user.maxDifficulty}</TableCell>
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
