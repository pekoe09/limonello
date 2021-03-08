import React from 'react'
import PropTypes from 'prop-types'

const PageTitle = ({ text }) => {
  return <h2
    style={{
      fontFamily: 'sans-serif',
      color: 'white',
      marginLeft: 10
    }}
  >
    {text}
  </h2>
}

export default PageTitle

PageTitle.propTypes = {
  text: PropTypes.string.isRequired
}