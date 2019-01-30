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
    },
});

function HistoricalTable(props) {
    const { classes, user, totalAcc, totalDif, totalKia, totalShots, totalSurv } = props;

    return (
    <Paper className={classes.root}>
        <Table className={classes.table}>
            <TableHead>
                <TableRow>
                    <TableCell>Career</TableCell>
                    <TableCell numeric>Accuracy (Avg %)</TableCell>
                    <TableCell numeric>Difficulty (Avg) </TableCell>
                    <TableCell numeric>Enemies Killed</TableCell>
                    <TableCell numeric>Shots Fired</TableCell>
                    <TableCell numeric>Time Survived (Secs)</TableCell>
                </TableRow>
            </TableHead>
            <TableBody>
                <TableRow>
                    <TableCell component="th" scope="row">
                        Totals
                    </TableCell>
                    <TableCell numeric>{totalAcc / user.historyAccuracy.length}</TableCell>
                    <TableCell numeric>{(totalDif / user.historyDifficulty.length).toFixed(2)}</TableCell>
                    <TableCell numeric>{totalKia}</TableCell>
                    <TableCell numeric>{totalShots}</TableCell>
                    <TableCell numeric>{totalSurv}</TableCell>
                </TableRow>
                <TableRow>
                    <TableCell component="th" scope="row">
                        Averages
                    </TableCell>
                    <TableCell numeric>{(totalAcc / user.historyAccuracy.length).toFixed(2)}</TableCell>
                    <TableCell numeric>{(totalDif / user.historyDifficulty.length).toFixed(2)}</TableCell>
                    <TableCell numeric>{(totalKia / user.historyEnemiesKilled.length).toFixed(0)}</TableCell>
                    <TableCell numeric>{(totalShots / user.historyShotsFired.length).toFixed(0)}</TableCell>
                    <TableCell numeric>{(totalSurv / user.historyTimeSurvived.length).toFixed(0)}</TableCell>
                </TableRow>
                <TableRow>
                    <TableCell component="th" scope="row">
                        Best
                    </TableCell>
                    <TableCell numeric>{user.maxTimeSurvived}</TableCell>
                    <TableCell numeric>{user.maxDifficulty}</TableCell>
                    <TableCell numeric>{user.maxEnemiesKilled}</TableCell>
                    <TableCell numeric>{user.maxShotsFired}</TableCell>
                    <TableCell numeric>{user.maxAccuracy}</TableCell>
                </TableRow>
            </TableBody>
        </Table>
    </Paper>
    );
}

HistoricalTable.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(HistoricalTable);
