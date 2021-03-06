import React from 'react'
import { connect } from 'react-redux'
import { NavLink } from 'react-router-dom'
import { Navbar, Nav, NavItem, NavDropdown, Image } from 'react-bootstrap'
import { Login, Logout } from '../users'

const AnonymousItems = () => {
  return (
    <Nav
      style={{ width: "100%" }}
      className='justify-content-end'
    >
      <NavItem>
        <Login />
      </NavItem>
    </Nav>
  )
}

const LoggedInItems = () => {
  return (
    <React.Fragment>
      <Nav
        style={{ width: "100%" }}
        className='justify-content-end'
      >
        <Nav.Link href='/recipes'>Recipes</Nav.Link>
        <NavDropdown title='Beverages' id='beverages-dropdown'>          
          <NavDropdown.Item href='/wines'>Wines</NavDropdown.Item>
          <NavDropdown.Item href='/grapes'>Grapes</NavDropdown.Item>  
          <NavDropdown.Item href='/winetypes'>Wine types</NavDropdown.Item>
          <NavDropdown.Divider />
          <NavDropdown.Item href='/beers'>Beers</NavDropdown.Item>
          <NavDropdown.Item href='/beertypes'>Beer types</NavDropdown.Item>
        </NavDropdown>
        <NavDropdown title='Static info' id='static-info-dropdown'>
          <NavDropdown.Item href='/countries'>Countries</NavDropdown.Item>
          <NavDropdown.Item href='/regions'>Regions</NavDropdown.Item>
          <NavDropdown.Item href='/cuisines'>Cuisines</NavDropdown.Item>
          <NavDropdown.Divider />
          <NavDropdown.Item href='/courses'>Courses</NavDropdown.Item>
          <NavDropdown.Item href='/dishtypes'>Dish types</NavDropdown.Item>
          <NavDropdown.Item href='/foodstuffs'>Foodstuffs</NavDropdown.Item>
          <NavDropdown.Divider />
          <NavDropdown.Item href='/measuretypes'>Measure types</NavDropdown.Item>
          <NavDropdown.Item href='/measures'>Measures</NavDropdown.Item>
        </NavDropdown>
        <Nav.Link href='/shoppinglist'>Shopping list</Nav.Link>
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