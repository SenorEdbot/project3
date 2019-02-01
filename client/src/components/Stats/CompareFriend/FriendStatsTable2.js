import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Toolbar from '@material-ui/core/Toolbar';

const styles = theme => ({
  root: {
    // width: '70%',
    marginTop: theme.spacing.unit * 3,
    overflowX: 'auto',
  },
  table: {
    backgroundColor: "#717171",
  },
  body: {
    color: "black",
    fontSize: "18px",
    fontFamily: "VT323"
  },
  title: {
    color: "white",
    fontFamily: "VT323",
    fontSize: "18px"
  },
  tool: {
    backgroundColor: "#717171"
  },
  name: {
    color: "black",
    fontFamily: "VT323",
    fontSize: "22px"
  }
});

function FriendStatsTable(props) {
  const { classes, user } = props;

  return (
    <Paper className={classes.root}>
      <Toolbar className={classes.tool}>
        <Typography className={classes.name} variant="h6" id="tableTitle">
          {user.name}
        </Typography>
      </Toolbar>
      <Table className={classes.table}>
        <TableHead>
          <TableRow>
            <TableCell className={classes.title} align="center">Recent</TableCell>
            <TableCell className={classes.title} align="center">Best</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          <TableRow>
            <TableCell className={classes.body} align="center">{user.recentEnemiesKilled}</TableCell>
            <TableCell className={classes.body} align="center">{user.maxEnemiesKilled}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell className={classes.body} align="center">{user.recentShotsFired}</TableCell>
            <TableCell className={classes.body} align="center">{user.maxShotsFired}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell className={classes.body} align="center">{(user.recentAccuracy).toFixed(1)}%</TableCell>
            <TableCell className={classes.body} align="center">{(user.maxAccuracy).toFixed(1)}%</TableCell>
          </TableRow>
          <TableRow>
            <TableCell className={classes.body} align="center">{user.recentTimeSurvived}</TableCell>
            <TableCell className={classes.body} align="center">{user.maxTimeSurvived}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell className={classes.body} align="center">{user.recentDifficulty}</TableCell>
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
