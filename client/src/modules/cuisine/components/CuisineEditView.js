import React, { useEffect, useState } from 'react'
import { withRouter, useHistory } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { Row } from 'react-bootstrap'
import {
  LimonelloForm,
  LimonelloFormButtons,
  LimonelloFormLabel,
  PageTitle
} from '../../core'

const CuisineEditView = ({
  match,
  handleSave,
  selectItemById
}) => {
  let history = useHistory()

  const cuisineId = match.params.id
  let cuisine = useSelector(state => selectItemById(state, cuisineId))

  const [id, setId] = useState(cuisine ? cuisine._id : '')
  const [name, setName] = useState(cuisine ? cuisine.name : '')
  const [touched, setTouched] = useState({
    name: false
  })
  const [errors, setErrors] = useState({})

  useEffect(() => {
    setErrors(validate())
  }, [touched])

  useEffect(() => {
    return () => clearState()
  }, [])

  const handleSaveRequest = async (e) => {
    e.preventDefault()
    const cuisine = {
      _id: id,
      name
    }
    try {
      await handleSave(cuisine)
      clearState()
      history.push('/cuisines')
    } catch (error) {
      console.log('error on save', error)
    }
  }

  const handleCancel = () => {
    clearState()
    history.push('/cuisines')
  }

  const handleNameChange = e => setName(e.target.value)

  const handleBlur = field => {
    setTouched({ ...touched, [field]: true })
  }

  const validate = () => {
    return {
      name: !name
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
  }

  return (
    <div style={{ padding: 15 }}>
      <Row>
        <PageTitle
          text={cuisine ? `Muokkaa ${cuisine.name}` : 'Lisää uusi keittiö'}
        />
      </Row>
      <Row>
        <LimonelloForm style={{ marginLeft: 15, marginTop: 15 }}>
          <LimonelloForm.Group controlId='name'>
            <LimonelloFormLabel>Nimi</LimonelloFormLabel>
            <LimonelloForm.Control
              type='text'
              name='name'
              value={name}
              onChange={handleNameChange}
              onBlur={handleBlur}
              isInvalid={getValidationState(errors, 'name')}
            />
          </LimonelloForm.Group>
          <LimonelloFormButtons
            handleSave={handleSaveRequest}
            handleCancel={handleCancel}
            saveIsDisabled={Object.keys(errors).some(x => errors[x])}
          />
        </LimonelloForm>
      </Row>
    </div>
  )
}

export default withRouter(CuisineEditView)