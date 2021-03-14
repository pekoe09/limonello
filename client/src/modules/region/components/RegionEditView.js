import React, { useEffect, useState } from 'react'
import { withRouter, useHistory } from 'react-router-dom'
import { connect } from 'react-redux'
import { Typeahead } from 'react-bootstrap-typeahead'
import 'react-bootstrap-typeahead/css/Typeahead.min.css'
import { Row } from 'react-bootstrap'
import {
  LimonelloForm,
  LimonelloFormButtons,
  LimonelloFormLabel,
  PageTitle
} from '../../core'

function RegionEditView(props) {
  let history = useHistory()
  let region = null
  const urlId = props.match.params.id
  if (urlId) {
    region = props.items.find(i => i[0] === urlId)[1]
  }

  const [id, setId] = useState(region ? region._id : '')
  const [name, setName] = useState(region ? region.name : '')
  const [country, setCountry] = useState(region ? [region.country] : [])
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

  const handleSave = async (e) => {
    e.preventDefault()
    const region = {
      _id: id,
      name,
      country: country[0]
    }
    await props.handleSave(region)
    if (!props.error) {
      clearState()
      history.push('/regions')
    }
  }

  const handleCancel = () => {
    clearState()
    history.push('/regions')
  }

  const handleNameChange = e => {
    setName(e.target.value)
  }

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
    setCountry('')
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
              onChange={(selected) => {setCountry(selected)}}
              options={props.countries}
              selected={country}
              labelKey='name'
              id='_id'
              maxResults={10}
            />
          </LimonelloForm.Group>
          <LimonelloFormButtons
            handleSave={handleSave}
            handleCancel={handleCancel}
            saveIsDisabled={Object.keys(errors).some(x => errors[x])}
          />
        </LimonelloForm>
      </Row>
    </div>
  )
}

const mapStateToProps = store => ({
  countries: Object.entries(store.countries.byId).map(o => o[1]),
  error: store.regions.error
})

export default withRouter(connect(
  mapStateToProps
)(RegionEditView))