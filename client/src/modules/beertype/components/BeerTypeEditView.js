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

const BeerTypeEditView = ({
  match,
  handleSave,
  selectItemById
}) => {
  let history = useHistory()

  const beerTypeId = match.params.id
  let beerType = useSelector(state => selectItemById(state, beerTypeId))

  const [id, setId] = useState(beerType ? beerType._id : '')
  const [name, setName] = useState(beerType ? beerType.name : '')
  const [description, setDescription] = useState(beerType ? beerType.description : '')
  const [touched, setTouched] = useState({
    name: false,
    description: false
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
    const beerType = {
      _id: id,
      name,
      description
    }
    try {
      await handleSave(beerType)
      clearState()
      history.push('/beertypes')
    } catch (error) {
      console.log('error on save', error)
    }
  }

  const handleCancel = () => {
    clearState()
    history.push('/beertypes')
  }

  const handleNameChange = e => setName(e.target.value)
  const handleDescriptionChange = e => setDescription(e.target.value)

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
    setDescription('')
  }

  return (
    <div style={{ padding: 15 }}>
      <Row>
        <PageTitle
          text={beerType ? `Muokkaa ${beerType.name}` : 'Lisää uusi oluttyyppi'}
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
          <LimonelloForm.Group controlId='description'>
            <LimonelloFormLabel>Description</LimonelloFormLabel>
            <LimonelloForm.Control
              as='textarea'
              rows='10'
              name='description'
              value={description}
              onChange={handleDescriptionChange}
              onBlur={handleBlur}
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

export default withRouter(BeerTypeEditView)