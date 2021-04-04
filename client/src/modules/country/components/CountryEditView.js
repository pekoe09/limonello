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

const CountryEditView = ({
  match,
  handleSave,
  selectItemById
}) => {
  let history = useHistory()

  const countryId = match.params.id
  let country = useSelector(state => selectItemById(state, countryId))

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

  const handleSaveRequest = async (e) => {
    e.preventDefault()
    const country = {
      _id: id,
      name,
      continent
    }
    try {
      await handleSave(country)
      clearState()
      history.push('/countries')
    } catch (error) {
      console.log('error on save:', error)
    }
  }

  const handleCancel = () => {
    clearState()
    history.push('/countries')
  }

  const handleNameChange = e => setName(e.target.value)
  const handleContinentChange = e => setContinent(e.target.value)

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
    <div style={{ padding: 15 }}>
      <Row>
        <PageTitle
          text={country ? `Muokkaa ${country.name}` : 'Lisää uusi maa'}
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
          <LimonelloForm.Group controlId='continent'>
            <LimonelloFormLabel>Manner</LimonelloFormLabel>
            <LimonelloForm.Control
              type='text'
              name='continent'
              value={continent}
              onChange={handleContinentChange}
              onBlur={handleBlur}
              isInvalid={getValidationState(errors, 'continent')}
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

export default withRouter(CountryEditView)