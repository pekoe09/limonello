import React from 'react'
import PropTypes from 'prop-types'

const mainTitleStyle = {
  color: 'white',
  fontSize: '1.4em'
}

const MainTitle = ({ text }) => {
  return (
    <div style={mainTitleStyle}>
      <p>{`Limonello - ${text}`}</p>
    </div>
  )
}

export default MainTitle

MainTitle.propTypes = {
  text: PropTypes.string.isRequired
}