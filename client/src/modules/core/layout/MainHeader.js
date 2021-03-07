import React from 'react'
import PropTypes from 'prop-types'
import MainTitle from './MainTitle'
import MainNavBar from './MainNavBar'
import { Container, Row, Col } from 'react-bootstrap'

const containerStyle = {
  minHeight: 60,
  minWidth: '100%',
  backgroundColor: 'lightGreen',
}

const MainHeader = ({ titleText }) => {
  return (
    <Container fluid style={containerStyle}>
      <Row>
          <Col sm={4}>
            <MainTitle text={titleText} />
          </Col>
          <Col>
            <MainNavBar />
          </Col>
      </Row>
    </Container>
  )
}

export default MainHeader

MainHeader.propTypes = {
  titleText: PropTypes.string.isRequired
}