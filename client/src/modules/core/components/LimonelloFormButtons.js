import React from 'react'
import { Button } from 'react-bootstrap'
import PropTypes from 'prop-types'

const LimonelloFormButtons = ({ handleSave, handleCancel, saveIsDisabled }) => {
  return (
    <>
      <Button
        bsstyle='primary'
        type='submit'
        onClick={handleSave}
        disabled={saveIsDisabled ? saveIsDisabled : false}
        style={{ marginRight: 5 }}
      >
        Tallenna
      </Button>
      <Button
        bsstyle='default'
        onClick={handleCancel}
      >
        Peruuta
      </Button>
    </>
  )
}

export default LimonelloFormButtons

LimonelloFormButtons.propTypes = {
  handleSave: PropTypes.func.isRequired,
  handleCancel: PropTypes.func.isRequired,
  saveIsDisabled: PropTypes.bool
}