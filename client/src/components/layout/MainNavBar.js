import React from 'react'
import { connect } from 'react-redux'
import { NavLink } from 'react-router-dom'
import { Navbar, Nav, NavItem, Image } from 'react-bootstrap'
import { Login, Logout } from '../users'

const AnonymousItems = () => {
  return (
    <Nav>
      <NavItem>
        <Login />
      </NavItem>
    </Nav>
  )
}

const LoggedInItems = () => {
  return (
    <React.Fragment>
      <Nav>
        <Logout />
      </Nav>
    </React.Fragment>
  )
}

const MainNavBar = ({ currentUser }) => {
  return (
    <Navbar>
      <Navbar.Toggle aria-controls='responsive-mainbar' className='custom-toggler' />
      <Navbar.Collapse id='responsive-mainbar'>
        {currentUser && <LoggedInItems />}
        {!currentUser && <AnonymousItems />}
      </Navbar.Collapse>
    </Navbar>
  )
}

const mapStateToProps = store => ({
  currentUser: store.users.currentUser
})

export default connect(
  mapStateToProps
)(MainNavBar)