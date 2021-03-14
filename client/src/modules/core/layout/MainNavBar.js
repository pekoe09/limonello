import React from 'react'
import { connect } from 'react-redux'
import { NavLink } from 'react-router-dom'
import { Navbar, Nav, NavItem, NavDropdown, Image } from 'react-bootstrap'
import { Login, Logout } from '../../user'

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
        style={{ width: "100%", paddingRight: 0 }}
        className='justify-content-end'
      >
        <Nav.Link href='/recipes'>Reseptit</Nav.Link>
        <NavDropdown title='Juomat' id='beverages-dropdown'>          
          <NavDropdown.Item href='/wines'>Viinit</NavDropdown.Item>
          <NavDropdown.Item href='/grapes'>Rypäleet</NavDropdown.Item>  
          <NavDropdown.Item href='/winetypes'>Viinityypit</NavDropdown.Item>
          <NavDropdown.Divider />
          <NavDropdown.Item href='/beers'>Oluet</NavDropdown.Item>
          <NavDropdown.Item href='/beertypes'>Oluttyypit</NavDropdown.Item>
        </NavDropdown>
        <NavDropdown title='Vakiotiedot' id='static-info-dropdown'>
          <NavDropdown.Item href='/countries'>Maat</NavDropdown.Item>
          <NavDropdown.Item href='/regions'>Alueet</NavDropdown.Item>
          <NavDropdown.Item href='/cuisines'>Keittiöt</NavDropdown.Item>
          <NavDropdown.Divider />
          <NavDropdown.Item href='/courses'>Ruokalajit</NavDropdown.Item>
          <NavDropdown.Item href='/dishtypes'>Ruokatyypit</NavDropdown.Item>
          <NavDropdown.Item href='/foodstuffs'>Ruoka-aineet</NavDropdown.Item>
          <NavDropdown.Item href='/ingredients'>Ainekset</NavDropdown.Item>
          <NavDropdown.Divider />
          <NavDropdown.Item href='/measuretypes'>Mittatyypit</NavDropdown.Item>
          <NavDropdown.Item href='/measures'>Mitat</NavDropdown.Item>
        </NavDropdown>
        <Nav.Link href='/shoppinglist'>Ostoslista</Nav.Link>
        <Logout />
      </Nav>
    </React.Fragment>
  )
}

const MainNavBar = ({ currentUser }) => {
  return (
    <Navbar  style={{paddingRight: 5}}>
      <Navbar.Toggle aria-controls='responsive-mainbar' className='custom-toggler'/>
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