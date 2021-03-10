import React from 'react'
import PropTypes from 'prop-types'

const PageTitle = ({ text }) => {
  return <h2
    style={{
      fontFamily: '"Pattaya", "sans-serif"',
      color: 'white',
      marginLeft: 15
    }}
  >
    {text}
  </h2>
}

export default PageTitle

PageTitle.propTypes = {
  text: PropTypes.string.isRequired
}