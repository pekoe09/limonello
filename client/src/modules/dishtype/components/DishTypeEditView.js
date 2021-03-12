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

function DishTypeEditView(props) {
  let history = useHistory()
  let dishType = null
  const urlId = props.match.params.id
  if (urlId) {
    dishType = props.items.find(i => i[0] === urlId)[1]
  }

  const [id, setId] = useState(dishType ? dishType._id : '')
  const [name, setName] = useState(dishType ? dishType.name : '')
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
    const dishType = {
      _id: id,
      name
    }
    await props.handleSave(dishType)
    if (!props.error) {
      clearState()
      history.push('/dishTypes')
    }
  }

  const handleCancel = () => {
    clearState()
    history.push('/dishTypes')
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
          text={dishType ? `Muokkaa ${dishType.name}` : 'Lisää uusi ruokatyyppi'}
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
  error: store.dishTypes.error
})

export default withRouter(connect(
  mapStateToProps
)(DishTypeEditView))