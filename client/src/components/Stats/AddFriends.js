import React from 'react'
import { withStyles } from '@material-ui/core/styles'
import Grid from '@material-ui/core/Grid'
import Paper from '@material-ui/core/Paper'
import FormControl from '@material-ui/core/FormControl'
import Select from '@material-ui/core/Select'
import MenuItem from '@material-ui/core/MenuItem'

const styles = theme => ({
  root: {
    flexGrow: "1"
  },
  friends: {
    color: "#222281",
    padding: theme.spacing.unit * 2
  },
  selectEmpty: {
    marginTop: theme.spacing.unit * 2,
  }
})

function AddFriends(props) {
  const { classes, allUsers } = props
  return (
    <Grid item>
      <FormControl className={classes.formControl}>
        <Select
          name="userToCompare"
          displayEmpty
          className={classes.selectEmpty}
        >
          {allUsers.map(user => (
            <MenuItem value={user.name}>
              {user.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Grid>
  )
}

export default withStyles(styles)(AddFriends)
