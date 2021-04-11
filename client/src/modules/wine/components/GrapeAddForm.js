import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { Form, FormGroup, FormLabel, FormControl } from 'react-bootstrap'
import { LimonelloButton } from '../../core'
import { Typeahead } from 'react-bootstrap-typeahead'
import 'react-bootstrap-typeahead/css/Typeahead.min.css'

const GrapeAddForm = ({
  allGrapes,
  handleAdd
}) => {
  const [grape, setGrape] = useState([])
  const [portion, setPortion] = useState('')

  const handleAddRequest = e => {
    e.preventDefault()
    let actualPortion = isNaN(portion) ? 0 : portion
    handleAdd(grape[0], actualPortion)
    setGrape([])
    setPortion('')
  }

  return (
    <Form inline>
      <FormGroup>
        <Typeahead
          onChange={selected => setGrape(selected)}
          options={allGrapes}
          selected={grape}
          labelKey='name'
          id='grape'
          maxResults={10}
          placeholder='Valitse rypäle'
        />
        <FormControl
          type='number'
          min={0}
          max={100}
          value={portion}
          onChange={e => setPortion(e.target.value)}
          style={{ marginLeft: 5, marginRight: 5 }}
        />
        <LimonelloButton
          onClick={handleAddRequest}
          disabled={!grape || grape.length === 0}
        >
          Lisää
        </LimonelloButton>
      </FormGroup>
    </Form>
  )
}

export default GrapeAddForm

GrapeAddForm.propTypes = {
  allGrapes: PropTypes.array.isRequired,
  handleAdd: PropTypes.func.isRequired
}