import React from 'react'
import PropTypes from 'prop-types'
import MainTitle from './MainTitle'
import MainNavBar from './MainNavBar'
import { Container, Row } from 'react-bootstrap'

const containerStyle = {
  minHeight: 100,
  minWidth: '100%',
  backgroundColor: 'lightGreen',
}

const mainHeaderStyle = {
  margin: 10

}

const MainHeader = ({ titleText }) => {
  return (
    <Container fluid style={containerStyle}>
      <Row></Row>
      <Row>
        <div style={mainHeaderStyle}>
          <MainTitle text={titleText} />
          <MainNavBar />
        </div>
      </Row>
    </Container>
  )
}

export default MainHeader

MainHeader.propTypes = {
  titleText: PropTypes.string.isRequired
}