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
            <TableCell className={classes.title} >Recent</TableCell>
            <TableCell className={classes.title} >Best</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          <TableRow>
            <TableCell className={classes.body} >{user.recentAccuracy}</TableCell>
            <TableCell className={classes.body} >{user.maxAccuracy}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell className={classes.body} >{user.recentDifficulty}</TableCell>
            <TableCell className={classes.body} >{user.maxDifficulty}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell className={classes.body} >{user.recentEnemiesKilled}</TableCell>
            <TableCell className={classes.body} >{user.maxEnemiesKilled}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell className={classes.body} >{user.recentShotsFired}</TableCell>
            <TableCell className={classes.body} >{user.maxShotsFired}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell className={classes.body} >{user.recentTimeSurvived}</TableCell>
            <TableCell className={classes.body} >{user.maxTimeSurvived}</TableCell>
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
