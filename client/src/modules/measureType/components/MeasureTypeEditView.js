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

const MeasureTypeEditView = ({
  match,
  handleSave,
  selectItemById
}) => {
  let history = useHistory()

  const measureTypeId = match.params.id
  let measureType = useSelector(state => selectItemById(state, measureTypeId))

  const [id, setId] = useState(measureType ? measureType._id : '')
  const [name, setName] = useState(measureType ? measureType.name : '')
  const [partitive, setPartitive] = useState(measureType ? measureType.partitive : '')
  const [touched, setTouched] = useState({
    name: false,
    partitive: false
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
    const measureType = {
      _id: id,
      name,
      partitive
    }
    try {
      await handleSave(measureType)
      clearState()
      history.push('/measuretypes')
    } catch (error) {
      console.log('error on save', error)
    }
  }

  const handleCancel = () => {
    clearState()
    history.push('/measuretypes')
  }

  const handleNameChange = e => setName(e.target.value)
  const handlePartitiveChange = e => setPartitive(e.target.value)

  const handleBlur = field => {
    setTouched({ ...touched, [field]: true })
  }

  const validate = () => {
    return {
      name: !name,
      partitive: !partitive
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
    setPartitive('')
  }

  return (
    <div style={{ padding: 15 }}>
      <Row>
        <PageTitle
          text={measureType ? `Muokkaa ${measureType.partitive}` : 'Lisää uusi mittatyyppi'}
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
          <LimonelloForm.Group controlId='partitive'>
            <LimonelloFormLabel>Partitiivi</LimonelloFormLabel>
            <LimonelloForm.Control
              type='text'
              name='partitive'
              value={partitive}
              onChange={handlePartitiveChange}
              onBlur={handleBlur}
              isInvalid={getValidationState(errors, 'partitive')}
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

export default withRouter(MeasureTypeEditView)