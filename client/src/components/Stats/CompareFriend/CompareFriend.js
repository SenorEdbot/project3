import React, { Component } from 'react'
import { withStyles } from '@material-ui/core/styles'
import Grid from '@material-ui/core/Grid'
import Paper from '@material-ui/core/Paper'
import FormControl from '@material-ui/core/FormControl'
import Select from '@material-ui/core/Select'
import MenuItem from '@material-ui/core/MenuItem'
import Input from '@material-ui/core/Input'
import InputLabel from '@material-ui/core/InputLabel'
import FormHelperText from '@material-ui/core/FormHelperText'
import FriendComp from './FriendComp'
import FriendComp1 from './FriendComp1'
import userServices from '../../../services/userServices'
// import '../../../App.css'

const styles = theme => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap'
  },
  formControl: {
    minWidth: 600,
    margin: '0 auto',
    color: "white",
    fontSize: "20px",
    fontFamily: "VT323",
    backgroundColor: "black",
  
  },
  paper: {
    padding: theme.spacing.unit * 2,
    margin: 'auto',
    backgroundColor: "black",
  },
 
  extra: {
    color: "grey",
    fontFamily: "VT323",
    fontSize: "16px"
  },
  menu: {
    color: "white",
    backgroundColor: "#717171",
    fontFamily: "VT323",
    fontSize: "20px",
    '&:before': {
      borderColor: 'red'
    },
    '&:after': {
        borderColor: 'red'
    }
},
  friend: {
    color:"black",
    textAlign: "center",
    backgroundColor: "white",
    fontFamily: "VT323",
    fontSize: "20px",
    "&:hover": {
      color: "white",
      backgroundColor: "black"
    }
  },
  user: {
    color: "white",
    fontFamily: "VT323",
    fontSize: "18px",
    '&:before': {
      color: "white"
    },
    '&:after': {
        color: "red"
    }
  },
  input: {
    color:"red",
  },
})

class AddFriends extends Component {
  state={
    secondUserObj: {},
    userToCompare: ''
  }
  handleChange = e => {
    userServices.getUserByUsername(e.target.value)
      .then(dbUser => {
        console.log('in saving 2nd user', dbUser.data)
        this.setState({ secondUserObj: dbUser.data, userToCompare: e.target.value })
      })
      .catch(err => console.log(err))
  }
  render() {
  const { classes, allUsers, user } = this.props
  return (
    <Grid item xs={10}>
      <Paper className={classes.paper}>
        <Grid container spacing={16}>
          <Grid item xs={12}>
            <form className={classes.root} autoComplete="off">
              <FormControl className={classes.formControl}>
                {/* <InputLabel className={classes.user} htmlFor="compare-user">Username</InputLabel> */}
                <Select
                  className={classes.menu}
                  value={this.state.userToCompare}
                  onChange={this.handleChange}
                  input={<Input className={classes.input} name="userToCompare" id="compare-user" />}
                  InputProps={{
                    className: classes.input,
                }}
                > 
                  {allUsers.map(user => (
                    <MenuItem className={classes.friend} name="userToCompare" value={user.name} key={user._id}>{user.name}</MenuItem>
                  ))}
                </Select>
                <FormHelperText className={classes.extra}>Select a Username to compare against!</FormHelperText>
              </FormControl>
            </form>
            </Grid>
            <Grid item xs={12}>
              {this.state.secondUserObj.name ? (
              <React.Fragment>
                <Grid className={classes.extra} container direction="row" justify="center" alignItems="center">
                  <FriendComp className={classes.extra}
                    user={user} />
                  <FriendComp1 className={classes.extra}
                    user={this.state.secondUserObj} />
                </Grid>
              </React.Fragment>
            ) : ("")}
            </Grid>
        </Grid>
      </Paper>
    </Grid>
  )
  }
}


export default withStyles(styles)(AddFriends)
