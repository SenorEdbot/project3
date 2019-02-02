import React, { Component } from 'react'
import { withStyles } from '@material-ui/core/styles'
import ReactChartkick, { ColumnChart } from 'react-chartkick'
import Chart from 'chart.js'
import Tabs from '@material-ui/core/Tabs'
import Tab from '@material-ui/core/Tab'
ReactChartkick.addAdapter(Chart)

const styles = theme => ({
  choice: {
    color: "#fe3e3e"
  }
})

class ColumnChartComp extends Component {
  state = {
    value: 0,
    accData: [],
    accObj: {},
    eKiaObj: {},
    timeObj: {},
    testObj: {"Game 1": 32, "Game 2": 46}
  }

  handleChange = (event, value) => {
    this.setState({ value });
  }

  componentDidMount() {
    let avgAcc = (this.props.totalAcc / this.props.user.historyAccuracy.length).toFixed(1)
    let eKiaAcc = (this.props.totalKia / this.props.user.historyEnemiesKilled.length).toFixed(0)
    let timeAcc = (this.props.totalSurv / this.props.user.historyTimeSurvived.length).toFixed(0)
    this.setState(
      { accObj: {
      "Recent": this.props.user.recentAccuracy,
      "Best": this.props.user.maxAccuracy,
      "Average": avgAcc
    }, eKiaObj: {
      "Recent": this.props.user.recentEnemiesKilled,
      "Best": this.props.user.maxEnemiesKilled,
      "Average": eKiaAcc
    }, timeObj: {
      "Recent": this.props.user.recentTimeSurvived,
      "Best": this.props.user.maxTimeSurvived,
      "Average": timeAcc
    }})
  }
  render() {
    console.log(this.props.user)
    const { classes } = this.props
    return (
      <div>
        <Tabs
          value={this.state.value}
          onChange={this.handleChange}
          // indicatorColor="primary"
          // textColor="primary"
          centered
          className={classes.choice}
        >
          <Tab label="Accuracy" />
          <Tab label="Enemies Killed" />
          <Tab label="Time Survived" />
      </Tabs>
        {/* accuracy graph */}
        {this.state.value === 0 && this.state.accObj && <ColumnChart data={this.state.accObj} colors={["#d32a29"]} />}
        {!this.state.accObj && ("")}
        {/* eKIA graph */}
        {this.state.value === 1 && this.state.eKiaObj && <ColumnChart data={this.state.eKiaObj} colors={["#d32a29"]} />}
        {!this.state.eKiaObj && ("")}
        {/* Time graph */}
        {this.state.value === 2 &&this.state.timeObj && <ColumnChart data={this.state.timeObj} colors={["#d32a29"]} />}
        {!this.state.timeObj && ("")}
      </div>
    )
  }
}

export default withStyles(styles)(ColumnChartComp)
