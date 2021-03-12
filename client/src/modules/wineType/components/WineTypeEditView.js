import React, { useEffect, useState } from 'react'
import { withRouter, useHistory } from 'react-router-dom'
import { connect } from 'react-redux'
import { Row } from 'react-bootstrap'
import {
  LimonelloForm,
  LimonelloFormButtons,
  LimonelloFormLabel,
  PageTitle
} from '../../core'

function WineTypeEditView(props) {
  let history = useHistory()
  let wineType = null
  const urlId = props.match.params.id
  if (urlId) {
    wineType = props.items.find(i => i[0] === urlId)[1]
  }

  const [id, setId] = useState(wineType ? wineType._id : '')
  const [name, setName] = useState(wineType ? wineType.name : '')
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

  const handleSave = async (e) => {
    e.preventDefault()
    const wineType = {
      _id: id,
      name
    }
    await props.handleSave(wineType)
    if (!props.error) {
      clearState()
      history.push('/winetypes')
    }
  }

  const handleCancel = () => {
    clearState()
    history.push('/winetypes')
  }

  const handleNameChange = e => {
    setName(e.target.value)
  }

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
          text={wineType ? `Muokkaa ${wineType.name}` : 'Lisää uusi viinityyppi'}
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
  error: store.wineTypes.error
})

export default withRouter(connect(
  mapStateToProps
)(WineTypeEditView))