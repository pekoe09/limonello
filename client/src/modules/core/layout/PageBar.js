import React from 'react'
import PropTypes from 'prop-types'
import { InputGroup, Button, Form, Row, Col } from 'react-bootstrap'

const PageBar = ({
  headerText,
  addBtnText,
  handleOpenEditPage,
  handlePhraseChange,
  handleSearch,
  searchPhrase,
  toggleAdvancedSearch
}) => {
  return (
    <React.Fragment>
      <p>pagebar</p>
    </React.Fragment>
  )
}

export default PageBar

PageBar.propTypes = {
  headerText: PropTypes.string,
  addBtnText: PropTypes.string.isRequired,
  handleOpenEditPage: PropTypes.func,
  handlePhraseChange: PropTypes.func,
  handleSearch: PropTypes.func,
  searchPhrase: PropTypes.string,
  toggleAdvancedSearch: PropTypes.func
}