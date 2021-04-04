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

const CourseEditView = ({
  match,
  handleSave,
  selectItemById
}) => {
  let history = useHistory()

  const courseId = match.params.id
  let course = useSelector(state => selectItemById(state, courseId))

  const [id, setId] = useState(course ? course._id : '')
  const [name, setName] = useState(course ? course.name : '')
  const [ordinality, setOrdinality] = useState(course ? course.ordinality : 0)
  const [touched, setTouched] = useState({
    name: false,
    ordinality: false
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
    const course = {
      _id: id,
      name,
      ordinality
    }
    try {
      await handleSave(course)
      clearState()
      history.push('/courses')
    } catch (error) {
      console.log('error on save:', error)
    }
  }

  const handleCancel = () => {
    clearState()
    history.push('/courses')
  }

  const handleNameChange = e => setName(e.target.value)
  const handleOrdinalityChange = e => setOrdinality(e.target.value)

  const handleBlur = field => {
    setTouched({ ...touched, [field]: true })
  }

  const validate = () => {
    return {
      name: !name,
      ordinality: !ordinality
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
    setOrdinality(0)
  }

  return (
    <div style={{ padding: 15 }}>
      <Row>
        <PageTitle
          text={course ? `Muokkaa ${course.name}` : 'Lisää uusi ruokalaji'}
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
          <LimonelloForm.Group controlId='ordinality'>
            <LimonelloFormLabel>Järjestys</LimonelloFormLabel>
            <LimonelloForm.Control
              type='number'
              name='ordinality'
              min={0}
              value={ordinality}
              onChange={handleOrdinalityChange}
              onBlur={handleBlur}
              isInvalid={getValidationState(errors, 'ordinality')}
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

export default withRouter(CourseEditView)