import ReactChartkick, { LineChart } from 'react-chartkick'
import React, { Component } from 'react'
import Chart from 'chart.js'

import Tabs from '@material-ui/core/Tabs'
import Tab from '@material-ui/core/Tab'


ReactChartkick.addAdapter(Chart)

class Graph extends Component {
  state = {
    accData: [],
    accObj: {},
    eKiaData: [],
    eKiaObj: {},
    timeData: [],
    timeObj: {},
    value: 0
  }

  handleChange = (event, value) => {
    this.setState({ value });
  }

  componentDidMount() {
    const user = this.props.user
    // let accArr = []
    // user.historyAccuracy.map((el, i) => {
    //   let tempArr = []
    //   let j = i + 1
    //   tempArr.push(j.toString(),el)
    //   accArr.push(tempArr)
    // })
    // console.log(accArr)
    // this.setState(prevState => ({
    //   accData: [...prevState.accData, accArr]
    // }))

    // accuracyBuilder
    let accObjBuilder = user.historyAccuracy.reduce(function(result, item, index, array) {
      result[index] = item; //a, b, c
      return result;
    }, {})
    console.log(accObjBuilder)
    this.setState({ accObj: accObjBuilder})

    // eKiaBuilder
    let eKiaBuilder = user.historyEnemiesKilled.reduce(function(result, item, index, array) {
      result[index] = item; //a, b, c
      return result;
    }, {})
    console.log(eKiaBuilder)
    this.setState({ eKiaObj: eKiaBuilder})
    
    // timeBuilder
    let timeBuilder = user.historyTimeSurvived.reduce(function(result, item, index, array) {
      result[index] = item; //a, b, c
      return result;
    }, {})
    console.log(timeBuilder)
    this.setState({ timeObj: timeBuilder})

  }


  render() {
    const { user } = this.props
    console.log(user)
    return(
      <div>
        <Tabs
          value={this.state.value}
          onChange={this.handleChange}
          indicatorColor="primary"
          textColor="primary"
          centered
        >
          <Tab label="Accuracy" />
          <Tab label="Enemies Killed" />
          <Tab label="Time Survived" />
      </Tabs>
        {/* accuracy graph */}
        {this.state.accObj && <LineChart data={this.state.accObj} xtitle="Game #" ytitle="Accuracy %" />}
        {!this.state.accObj && ("")}
        {/* eKIA graph */}
        {this.state.eKiaObj && <LineChart data={this.state.eKiaObj} xtitle="Game #" ytitle="Enemies Killed" />}
        {!this.state.eKiaObj && ("")}
        {/* Time graph */}
        {this.state.timeObj && <LineChart data={this.state.timeObj} xtitle="Game #" ytitle="Time Survived" />}
        {!this.state.timeObj && ("")}
      </div>
    
    )
  }
}

// {this.state.accData && <ScatterChart data={this.state.accData} xtitle="Game #" ytitle="Accuracy" />}


          // user.historyAccuracy.map((el, index) => ({
            
          // }))
          // const userData
          // const data = [
          //   {"2017-05-13": 2, "2017-05-14": 5}
          //   // {"name":"Call parents", "data": {"2017-01-01": 5, "2017-01-02": 3}}
          // ];
        // {user.historyAccuracy.map((el, index) => (
    
          
        // ))}

// <LineChart data={[[new Date(), 5], [1368174456, 4], ["2017-01-01 00:00:00 UTC", 7]]} />

// {user.historyAccuracy.map((el, index) => (
//   <TableRow>
//       <TableCell>{index+1}</TableCell>
//       <TableCell>{user.historyAccuracy[index]}</TableCell>
//       <TableCell>{user.historyDifficulty[index]}</TableCell>
//       <TableCell>{user.historyEnemiesKilled[index]}</TableCell>
//       <TableCell>{user.historyShotsFired[index]}</TableCell>
//       <TableCell>{user.historyTimeSurvived[index]}</TableCell>
//   </TableRow>
// ))}

// export default function Graph() {
  
//   return(
//     <LineChart data={{"2017-05-13": 2, "2017-05-14": 5, "2017-05-15": 1, "2017-05-16": 6, "2017-05-17": 7}} />

//   )
// }

export default Graph
