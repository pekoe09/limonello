import React, { useEffect, useState } from 'react'
import { withRouter, useHistory } from 'react-router-dom'
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
  selectRegionById
} from '../regionsSlice'
import {
  selectAllCountries
} from '../../country/countriesSlice'
import { useSelector } from 'react-redux'

const RegionEditView = ({
  match,
  handleSave
}) => {
  let history = useHistory()

  const regionId = match.params.id
  let region = useSelector(state => selectRegionById(state, regionId))
  const countries = Object.values(useSelector(selectAllCountries))
  const initialCountry = region ? countries.find(c => c._id === region.country) : null

  const [id, setId] = useState(region ? region._id : '')
  const [name, setName] = useState(region ? region.name : '')
  const [country, setCountry] = useState(region ? [initialCountry] : [])
  const [oldCountryId, setOldCountryId] = useState(region ? region.country._id : '')
  const [touched, setTouched] = useState({
    name: false,
    country: false
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
    const region = {
      _id: id,
      name,
      country: country[0],
      oldCountryId
    }
    try {
      await handleSave(region)
      clearState()
      history.push('regions')
    } catch (error) {
      console.log('error on save', error)
    }
  }

  const handleCancel = () => {
    clearState()
    history.push('/regions')
  }

  const handleNameChange = e => setName(e.target.value)

  const handleBlur = field => {
    setTouched({ ...touched, [field]: true })
  }

  const validate = () => {
    return {
      name: !name,
      country: !country
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
    setCountry([])
    setOldCountryId('')
  }

  return (
    <div style={{ padding: 15 }}>
      <Row>
        <PageTitle
          text={region ? `Muokkaa ${region.name}` : 'Lisää uusi alue'}
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
          <LimonelloForm.Group>
            <LimonelloFormLabel>Maa</LimonelloFormLabel>
            <Typeahead
              onChange={(selected) => { setCountry(selected) }}
              options={countries}
              selected={country}
              labelKey='name'
              id='country'
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

export default withRouter(RegionEditView)