import React, { useEffect, useState } from 'react'
import { withRouter, useHistory } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { Typeahead } from 'react-bootstrap-typeahead'
import 'react-bootstrap-typeahead/css/Typeahead.min.css'
import { Row } from 'react-bootstrap'
import {
  LimonelloForm,
  LimonelloFormButtons,
  LimonelloFormLabel,
  PageTitle
} from '../../core'
import {
  selectAllMeasureTypes
} from '../../measureType'

const MeasureEditView = ({
  match,
  handleSave,
  selectItemById
}) => {
  let history = useHistory()

  const measureId = match.params.id
  let measure = useSelector(state => selectItemById(state, measureId))
  const measureTypes = Object.values(useSelector(selectAllMeasureTypes))
  const initialMeasureType = measure ? measureTypes.find(t => t._id === measure.measureType) : null

  const [id, setId] = useState(measure ? measure._id : '')
  const [name, setName] = useState(measure ? measure.name : '')
  const [partitive, setPartitive] = useState(measure ? measure.partitive : '')
  const [abbreviation, setAbbreviation] = useState(measure ? measure.abbreviation : '')
  const [measureType, setMeasureType] = useState(measure ? [initialMeasureType] : [])
  const [oldMeasureTypeId, setOldMeasureTypeId] = useState(measure ? measure.measureType._id : '')
  const [touched, setTouched] = useState({
    name: false,
    partitive: false,
    abbreviation: false,
    measureType: false
  })
  const [errors, setErrors] = useState({})

  useEffect(() => {
    setErrors(validate())
  }, [touched])

  useEffect(() => {
    return () => clearState()
  }, [])

  const handleSaveReguest = async (e) => {
    e.preventDefault()
    const measure = {
      _id: id,
      name,
      partitive,
      abbreviation,
      measureType: measureType[0],
      oldMeasureTypeId
    }
    try {
      await handleSave(measure)
      clearState()
      history.push('/measures')
    } catch (error) {
      console.log('error on save', error)
    }
  }

  const handleCancel = () => {
    clearState()
    history.push('/measures')
  }

  const handleNameChange = e => setName(e.target.value)
  const handlePartitiveChange = e => setPartitive(e.target.value)
  const handleAbbreviationChange = e => setAbbreviation(e.target.value)

  const handleBlur = field => {
    setTouched({ ...touched, [field]: true })
  }

  const validate = () => {
    return {
      name: !name,
      partitive: !partitive,
      abbreviation: !abbreviation,
      measureType: !measureType
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
    setAbbreviation('')
    setMeasureType([])
    setOldMeasureTypeId('')
  }

  return (
    <div style={{ padding: 15 }}>
      <Row>
        <PageTitle
          text={measure ? `Muokkaa ${measure.name}` : 'Lisää uusi mitta'}
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
          <LimonelloForm.Group controlId='abbreviation'>
            <LimonelloFormLabel>Lyhenne</LimonelloFormLabel>
            <LimonelloForm.Control
              type='text'
              name='abbreviation'
              value={abbreviation}
              onChange={handleAbbreviationChange}
              onBlur={handleBlur}
              isInvalid={getValidationState(errors, 'abbreviation')}
            />
          </LimonelloForm.Group>
          <LimonelloForm.Group>
            <LimonelloFormLabel>Tyyppi</LimonelloFormLabel>
            <Typeahead
              onChange={(selected) => { setMeasureType(selected) }}
              options={measureTypes}
              selected={measureType}
              labelKey='name'
              id='_id'
              maxResults={10}
            />
          </LimonelloForm.Group>
          <LimonelloFormButtons
            handleSave={handleSaveReguest}
            handleCancel={handleCancel}
            saveIsDisabled={Object.keys(errors).some(x => errors[x])}
          />
        </LimonelloForm>
      </Row>
    </div>
  )
}

export default withRouter(MeasureEditView)