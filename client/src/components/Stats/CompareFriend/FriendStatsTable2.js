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
  // table: {
  //   minWidth: 700,
  // },
});

function FriendStatsTable(props) {
  const { classes, user } = props;

  return (
    <Paper className={classes.root}>
      <Toolbar>
        <Typography variant="h6" id="tableTitle">
          {user.name}
        </Typography>
      </Toolbar>
      <Table className={classes.table}>
        <TableHead>
          <TableRow>
            <TableCell>Recent</TableCell>
            <TableCell>Best</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          <TableRow>
            <TableCell>{user.recentAccuracy}</TableCell>
            <TableCell>{user.maxAccuracy}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>{user.recentDifficulty}</TableCell>
            <TableCell>{user.maxDifficulty}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>{user.recentEnemiesKilled}</TableCell>
            <TableCell>{user.maxEnemiesKilled}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>{user.recentShotsFired}</TableCell>
            <TableCell>{user.maxShotsFired}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>{user.recentTimeSurvived}</TableCell>
            <TableCell>{user.maxTimeSurvived}</TableCell>
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
