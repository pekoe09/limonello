import React, { useEffect, useState } from 'react'
import { withRouter, useHistory } from 'react-router-dom'
import { connect } from 'react-redux'
import { Form, Row } from 'react-bootstrap'
import {
  LimonelloFormButtons,
  PageTitle
} from '../../core'

function CountryEditView(props) {
  let history = useHistory()
  let country = null
  const urlId = props.match.params.id
  if (urlId) {
    country = props.items.find(i => i[0] === urlId)[1]
  }

  const [id, setId] = useState(country ? country._id : '')
  const [name, setName] = useState(country ? country.name : '')
  const [continent, setContinent] = useState(country ? country.continent : '')
  const [touched, setTouched] = useState({
    name: false,
    continent: false
  })
  const [errors, setErrors] = useState({})

  useEffect(() => {
    setErrors(validate())
  }, [touched])

  useEffect(() => {
    return () => clearState()
  }, [])

  const handleSave = async (e) => {
    e.preventDefault()
    const country = {
      _id: id,
      name,
      continent
    }
    await props.handleSave(country)
    if (!props.error) {
      clearState()
      history.push('/countries')
    }
  }

  const handleCancel = () => {
    clearState()
    history.push('/countries')
  }

  const handleNameChange = e => {
    setName(e.target.value)
  }

  const handleContinentChange = e => {
    setContinent(e.target.value)
  }

  const handleBlur = field => {
    setTouched({ ...touched, [field]: true })
  }

  const validate = () => {
    return {
      name: !name,
      continent: !continent
    }
  }

  const getValidationState = (errors, field) => {
    if (errors[field] && touched[field]) {
      return 'error'
    } else {
      return null
    }
  }

  const clearState = () => {
    setId('')
    setName('')
    setContinent('')
  }

  return (
    <div>
      <Row>
        <PageTitle
          text={country ? `Edit ${country.name}` : 'Add new country'}
        />
      </Row>
      <Row>
        <Form>
          <Form.Group controlId='name'>
            <Form.Label>Name</Form.Label>
            <Form.Control
              type='text'
              name='name'
              value={name}
              onChange={handleNameChange}
              onBlur={handleBlur}
              isInvalid={getValidationState(errors, 'name')}
            />
          </Form.Group>
          <Form.Group controlId='continent'>
            <Form.Label>Continent</Form.Label>
            <Form.Control
              type='text'
              name='continent'
              value={continent}
              onChange={handleContinentChange}
              onBlur={handleBlur}
              isInvalid={getValidationState(errors, 'continent')}
            />
          </Form.Group>
          <LimonelloFormButtons
            handleSave={handleSave}
            handleCancel={handleCancel}
            saveIsDisabled={Object.keys(errors).some(x => errors[x])}
          />
        </Form>
      </Row>
    </div>
  )
}

const mapStateToProps = store => ({
  error: store.countries.error
})

export default withRouter(connect(
  mapStateToProps
)(CountryEditView))