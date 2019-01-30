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
                    <TableCell>Accuracyy</TableCell>
                    <TableCell>Difficulty</TableCell>
                    <TableCell>Enemies Killed</TableCell>
                    <TableCell>Shots Fired</TableCell>                
                    <TableCell>Time Survived</TableCell>                
                </TableRow>
            </TableHead>
            <TableBody>
                {user.historyAccuracy.map((el, index) => (
                    <TableRow>
                        <TableCell>{index+1}</TableCell>
                        <TableCell>{user.historyAccuracy[index]}</TableCell>
                        <TableCell>{user.historyDifficulty[index]}</TableCell>
                        <TableCell>{user.historyEnemiesKilled[index]}</TableCell>
                        <TableCell>{user.historyShotsFired[index]}</TableCell>
                        <TableCell>{user.historyTimeSurvived[index]}</TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    </Paper>
  )
}

GameHistory.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(GameHistory);