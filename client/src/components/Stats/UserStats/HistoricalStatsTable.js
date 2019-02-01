import React, { Component } from 'react';
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
	}
});

class HistoricalTable extends Component {
	state = {
		totalAcc: 0,
		totalDif: 0,
		totalKia: 0,
		totalShots: 0,
		totalSurv: 0
	}

	reducer = (accumulator, currentValue) => accumulator + currentValue;

	totalAcc = () => {
		let totalAccuracy = this.props.user.historyAccuracy.reduce(this.reducer)
		this.setState({
			totalAcc: totalAccuracy
		})
	}
	totalDif = () => {
		let totalDifficulty = this.props.user.historyDifficulty.reduce(this.reducer)
		this.setState({
			totalDif: totalDifficulty
		})
	}
	totalKia = () => {
		let totalEnemiesKilled = this.props.user.historyEnemiesKilled.reduce(this.reducer)
		this.setState({
			totalKia: totalEnemiesKilled
		})
	}
	totalShots = () => {
		let totalShotsFired = this.props.user.historyShotsFired.reduce(this.reducer)
		this.setState({
			totalShots: totalShotsFired
		})
	}
	totalSurv = () => {
		let totalTimeSurvived = this.props.user.historyTimeSurvived.reduce(this.reducer)
		this.setState({
			totalSurv: totalTimeSurvived
		})
	}

	componentDidMount() {
		if (this.props.user && this.props.user.maxAccuracy) {
			this.totalAcc()
			this.totalDif()
			this.totalKia()
			this.totalShots()
			this.totalSurv()
		}
	}
	render() {
		const { classes, user } = this.props;
		const { totalAcc, totalDif, totalKia, totalShots, totalSurv } = this.state

		return (
			<Paper className={classes.root}>
				<Table className={classes.table}>
					<TableHead>
						<TableRow>
							<TableCell className={classes.title}>Career</TableCell>
							<TableCell className={classes.title} align="center">Enemies Killed</TableCell>
							<TableCell className={classes.title} align="center">Shots Fired</TableCell>
							<TableCell className={classes.title} align="center">Accuracy (Avg %)</TableCell>
							<TableCell className={classes.title} align="center">Time Survived (Secs)</TableCell>
							<TableCell className={classes.title} align="center">Difficulty (Avg) </TableCell>
						</TableRow>
					</TableHead>
					<TableBody>
						<TableRow>
							<TableCell className={classes.title} component="th" scope="row">
								Totals
							</TableCell>
							<TableCell className={classes.body} align="center">{totalKia}</TableCell>
							<TableCell className={classes.body} align="center">{totalShots}</TableCell>
							<TableCell className={classes.body} align="center">{(totalAcc / user.historyAccuracy.length).toFixed(1)}%</TableCell>
							<TableCell className={classes.body} align="center">{totalSurv}</TableCell>
							<TableCell className={classes.body} align="center">{(totalDif / user.historyDifficulty.length).toFixed(1)}</TableCell>
						</TableRow>
						<TableRow>
							<TableCell className={classes.title} component="th" scope="row">
								Averages
							</TableCell>
							<TableCell className={classes.body} align="center">{(totalKia / user.historyEnemiesKilled.length).toFixed(0)}</TableCell>
							<TableCell className={classes.body} align="center">{(totalShots / user.historyShotsFired.length).toFixed(0)}</TableCell>
							<TableCell className={classes.body} align="center">{(totalAcc / user.historyAccuracy.length).toFixed(1)}%</TableCell>
							<TableCell className={classes.body} align="center">{(totalSurv / user.historyTimeSurvived.length).toFixed(0)}</TableCell>
							<TableCell className={classes.body} align="center">{(totalDif / user.historyDifficulty.length).toFixed(1)}</TableCell>
						</TableRow>
						<TableRow>
							<TableCell className={classes.title} component="th" scope="row">
								Best
							</TableCell>
							<TableCell className={classes.body} align="center">{user.maxEnemiesKilled}</TableCell>
							<TableCell className={classes.body} align="center">{user.maxShotsFired}</TableCell>
							<TableCell className={classes.body} align="center">{(user.maxAccuracy).toFixed(1)}%</TableCell>
							<TableCell className={classes.body} align="center">{user.maxTimeSurvived}</TableCell>
							<TableCell className={classes.body} align="center">{user.maxDifficulty}</TableCell>
						</TableRow>
					</TableBody>
				</Table>
			</Paper>
		);
	}
}

HistoricalTable.propTypes = {
	classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(HistoricalTable);
