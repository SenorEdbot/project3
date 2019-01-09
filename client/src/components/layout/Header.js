import React from 'react'
import { Link } from 'react-router-dom'

export default function Header() {
  return (
    <header>
      <h1>MidWaste Warriors</h1>
      <Link
        to="/"
      >Home </Link>
      |
      <Link
        to="/stats"
      > Stats</Link>
    </header>
  )
}
