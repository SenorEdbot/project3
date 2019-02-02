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
        backgroundColor: "black"
    },
    title: {
        color: "white",
        fontFamily: "VT323",
        fontSize: "20px",  
    },
    paper: {
        padding: theme.spacing.unit * 2,
        margin: 'auto',
        backgroundColor: "black",
        marginTop: "30px"
      },
    body: {
        color: "grey",
        fontSize: "18px",
        fontFamily: "VT323"
      }
   
});

function GameHistory(props) {
    const { classes, user } = props; 
  return (
    <React.Fragment>
    <Paper className={classes.root}>
        <Table className={classes.table}>
            <TableHead>
                <TableRow>
                    <TableCell className={classes.title}>Game History</TableCell>
                    <TableCell className={classes.title}>Enemies Killed</TableCell>
                    <TableCell className={classes.title}>Shots Fired</TableCell>                
                    <TableCell className={classes.title}>Accuracy</TableCell>
                    <TableCell className={classes.title}>Time Survived</TableCell>                
                    <TableCell className={classes.title}>Difficulty</TableCell>
                </TableRow>
            </TableHead>
            <TableBody>
                {user.historyAccuracy.map((el, index) => (
                    <TableRow>
                        <TableCell className={classes.body}>{index+1}</TableCell>
                        <TableCell className={classes.body} align="center">{user.historyEnemiesKilled[index]}</TableCell>
                        <TableCell className={classes.body} align="center">{user.historyShotsFired[index]}</TableCell>
                        <TableCell className={classes.body} align="center">{(user.historyAccuracy[index]).toFixed(1)}%</TableCell>
                        <TableCell className={classes.body} align="center">{user.historyTimeSurvived[index]}</TableCell>
                        <TableCell className={classes.body} align="center">{user.historyDifficulty[index]}</TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    </Paper>
    </React.Fragment>
  )
}

GameHistory.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(GameHistory);