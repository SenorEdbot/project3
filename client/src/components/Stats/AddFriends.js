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

const styles = theme => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap'
  },
  formControl: {
    minWidth: 600,
    margin: '0 auto'
  }
})

class AddFriends extends Component {
  render() {
  const { classes, allUsers } = this.props
  return (
    <Grid item xs={12}>
      <Paper>
        <form className={classes.root} autoComplete="off">
          <FormControl className={classes.formControl}>
            <InputLabel htmlFor="compare-user">Username</InputLabel>
            <Select
              value={this.props.userToCompare}
              onChange={this.props.handleChange}
              input={<Input name="userToCompare" id="compare-user" />}
            >
              {allUsers.map(user => (
                <MenuItem name="userToCompare" value={user.name} key={user._id}>{user.name}</MenuItem>
              ))}
            </Select>
            <FormHelperText>Select a Username to compare against!</FormHelperText>
          </FormControl>
        </form>
      </Paper>
    </Grid>
  )
  }
}


export default withStyles(styles)(AddFriends)
