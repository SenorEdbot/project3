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

const styles = theme => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap'
  },
  formControl: {
    minWidth: 600,
    margin: '0 auto'
  },
  paper: {
    padding: theme.spacing.unit * 2,
    margin: 'auto'
  }
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
                <InputLabel htmlFor="compare-user">Username</InputLabel>
                <Select
                  value={this.state.userToCompare}
                  onChange={this.handleChange}
                  input={<Input name="userToCompare" id="compare-user" />}
                >
                  {allUsers.map(user => (
                    <MenuItem name="userToCompare" value={user.name} key={user._id}>{user.name}</MenuItem>
                  ))}
                </Select>
                <FormHelperText>Select a Username to compare against!</FormHelperText>
              </FormControl>
            </form>
            </Grid>
            <Grid item xs={12}>
              {this.state.secondUserObj.name ? (
              <React.Fragment>
                <Grid container direction="row">
                  <FriendComp
                    user={user} />
                  <FriendComp1
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
