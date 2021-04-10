import React from 'react'
import { Button } from 'react-bootstrap'
import PropTypes from 'prop-types'

const LimonelloDetailsButtons = ({
  handleEdit, handleReturn, handleAdd }) => {
  return (
    <>
      <Button
        bsstyle='default'
        onClick={handleReturn}
        style={{ marginRight: 5 }}
      >
        Takaisin
      </Button>
      <Button
        bsstyle='primary'
        type='submit'
        onClick={handleEdit}
        style={{ marginRight: 5 }}
      >
        Muokkaa
      </Button>
      {handleAdd &&
        <Button
          bsstyle='primary'
          type='submit'
          onClick={handleAdd}
          style={{ marginRight: 5 }}
        >
          Uusi
        </Button>
      }
    </>
  )
}

export default LimonelloDetailsButtons

LimonelloDetailsButtons.propTypes = {
  handleEdit: PropTypes.func.isRequired,
  handleReturn: PropTypes.func.isRequired,
  handleAdd: PropTypes.func
}