import React from 'react'
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';



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

function GameHistory(props) {
    const { classes, user } = props; 
  return (
    <Paper className={classes.root}>
    <Table className={classes.table}>
        <TableHead>
            <TableRow>
                <TableCell>Game History</TableCell>
                {user.historyAccuracy.map((el, index) => (
                    <TableCell>{index + 1}</TableCell>
                ))}
            </TableRow>
        </TableHead>
        <TableBody>
            <TableRow>
                <TableCell component="th" scope="row">
                    Accuracy
                </TableCell>
                {user.historyAccuracy.map(el => (
                    <TableCell>{el}</TableCell>
                ))}
            </TableRow>
            <TableRow>
                <TableCell component="th" scope="row">
                    Difficulty
                </TableCell>
                {user.historyDifficulty.map(el => (
                    <TableCell>{el}</TableCell>
                ))}
            </TableRow>
            <TableRow>
                <TableCell component="th" scope="row">
                    Enemies Killed
                </TableCell>
                {user.historyEnemiesKilled.map(el => (
                    <TableCell>{el}</TableCell>
                ))}
            </TableRow>
            <TableRow>
                <TableCell component="th" scope="row">
                    Shots Fired
                </TableCell>
                {user.historyShotsFired.map(el => (
                    <TableCell>{el}</TableCell>
                ))}
            </TableRow>
            <TableRow>
                <TableCell component="th" scope="row">
                    Time Survived
                </TableCell>
                {user.historyTimeSurvived.map(el => (
                    <TableCell>{el}</TableCell>
                ))}
            </TableRow>
        </TableBody>
    </Table>
</Paper>
  )
}

GameHistory.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(GameHistory);