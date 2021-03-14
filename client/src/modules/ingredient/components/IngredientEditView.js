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

function IngredientEditView(props) {
  let history = useHistory()
  let ingredient = null
  const urlId = props.match.params.id
  if (urlId) {
    ingredient = props.items.find(i => i[0] === urlId)[1]
  }

  const [id, setId] = useState(ingredient ? ingredient._id : '')
  const [name, setName] = useState(ingredient ? ingredient.name : '')
  const [partitive, setPartitive] = useState(ingredient ? ingredient.partitive : '')
  const [comment, setComment] = useState(ingredient ? ingredient.comment : '')
  const [foodstuff, setFoodstuff] = useState(ingredient ? [ingredient.foodstuff] : [])
  const [oldFoodstuffId, setOldFoodstuffId] = useState(ingredient ? ingredient.foodstuff._id : '')
  const [touched, setTouched] = useState({
    name: false,
    partitive: false,
    comment: false,
    foodstuff: false
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
    const ingredient = {
      _id: id,
      name,
      partitive,
      comment,
      foodstuff: foodstuff[0]._id,
      oldFoodstuffId
    }
    await props.handleSave(ingredient)
    if (!props.error) {
      clearState()
      history.push('/ingredients')
    }
  }

  const handleCancel = () => {
    clearState()
    history.push('/ingredients')
  }

  const handleNameChange = e => {
    setName(e.target.value)
  }

  const handlePartitiveChange = e => {
    setPartitive(e.target.value)
  }

  const handleCommentChange = e => {
    setComment(e.target.value)
  }

  const handleBlur = field => {
    setTouched({ ...touched, [field]: true })
  }

  const validate = () => {
    return {
      name: !name,
      partitive: !partitive,
      foodstuff: !foodstuff
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
    setComment('')
    setFoodstuff([])
    setOldFoodstuffId('')
  }

  return (
    <div style={{ padding: 15 }}>
      <Row>
        <PageTitle
          text={ingredient ? `Muokkaa ${ingredient.partitive}` : 'Lisää uusi aines'}
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
          <LimonelloForm.Group controlId='comment'>
            <LimonelloFormLabel>Kommentti</LimonelloFormLabel>
            <LimonelloForm.Control
              as='textarea'
              rows='10'
              name='comment'
              value={comment}
              onChange={handleCommentChange}
              onBlur={handleBlur}
              isInvalid={getValidationState(errors, 'comment')}
            />
          </LimonelloForm.Group>
          <LimonelloForm.Group>
            <LimonelloFormLabel>Ruoka-aine</LimonelloFormLabel>
            <Typeahead
              onChange={(selected) => { setFoodstuff(selected) }}
              options={props.foodstuffs}
              selected={foodstuff}
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
  foodstuffs: Object.entries(store.foodstuffs.byId).map(o => o[1]),
  error: store.ingredients.error
})

export default withRouter(connect(
  mapStateToProps
)(IngredientEditView))