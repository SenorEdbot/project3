import React from 'react'
import { Link } from 'react-router-dom'
import { withStyles } from '@material-ui/core/styles'

const styles = {
  root: {
    color: "#fff",
    textDecoration: "none"
  }
}

function Header(props) {
  const { classes } = props
  return (
    <header>
      <h1>MidWaste</h1>
        <div className={classes.root}>
          <Link
            to="/"
          >Home </Link>
          |
          <Link
            to="/stats"
          > Stats</Link>        
        </div>
    </header>
  )
}

export default withStyles(styles)(Header)
