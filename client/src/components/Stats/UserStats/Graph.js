import ReactChartkick, { LineChart } from 'react-chartkick'
import Chart from 'chart.js'
import React, { Component } from 'react'
import { withStyles } from '@material-ui/core/styles'

import Tabs from '@material-ui/core/Tabs'
import Tab from '@material-ui/core/Tab'


ReactChartkick.addAdapter(Chart)

const styles = theme => ({
  choice: {
    color: "#fe3e3e"
  }
})

class Graph extends Component {
  state = {
    accObj: {},
    eKiaObj: {},
    timeObj: {},
    value: 0
  }

  handleChange = (event, value) => {
    this.setState({ value });
  }

  componentDidMount() {
    const user = this.props.user

    // accuracyBuilder
    let accObjBuilder = user.historyAccuracy.reduce(function(result, item, index, array) {
      result[index] = item; //a, b, c
      return result;
    }, {})
    this.setState({ accObj: accObjBuilder})

    // eKiaBuilder
    let eKiaBuilder = user.historyEnemiesKilled.reduce(function(result, item, index, array) {
      result[index] = item; //a, b, c
      return result;
    }, {})
    this.setState({ eKiaObj: eKiaBuilder})
    
    // timeBuilder
    let timeBuilder = user.historyTimeSurvived.reduce(function(result, item, index, array) {
      result[index] = item; //a, b, c
      return result;
    }, {})
    this.setState({ timeObj: timeBuilder})

  }


  render() {
    const { classes, user } = this.props
    console.log(user)
    return(
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
        {this.state.value === 0 && this.state.accObj && <LineChart colors={["#d32a29"]} data={this.state.accObj} xtitle="Game #" ytitle="Accuracy" />}
        {!this.state.accObj && ("")}
        {/* eKIA graph */}
        {this.state.value === 1 && this.state.eKiaObj && <LineChart colors={["#d32a29"]} data={this.state.eKiaObj} xtitle="Game #" ytitle="Kills" />}
        {!this.state.eKiaObj && ("")}
        {/* Time graph */}
        {this.state.value === 2 &&this.state.timeObj && <LineChart colors={["#d32a29"]} data={this.state.timeObj} xtitle="Game #" ytitle="Time Survived (sec)" />}
        {!this.state.timeObj && ("")}
      </div>
    
    )
  }
}

export default withStyles(styles)(Graph)
