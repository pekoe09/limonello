import React, { useEffect, useState } from 'react'
import { withRouter, useHistory, useLocation } from 'react-router-dom'
import queryString from 'query-string'
import { connect } from 'react-redux'
import { Form, Row, Col } from 'react-bootstrap'
import {
  LimonelloButton,
  PageTitle
} from '../../core'
import { StrictMode } from 'react'

function CountryEditPage(props) {
  let history = useHistory()
  const { search } = useLocation()

  const q = queryString.parse(search)
  let country = null
  if (q && q.id) {
    country = props.countries[q.id]
  }

  const [id, setId] = useState(country ? country._id : '')
  const [name, setName] = useState(country ? country.name : '')
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
    const country = {
      _id: id,
      name
    }
    await props.handleSave(country)
    if (!props.error) {
      clearState()
      history.push('/countries')
    }
  }

  const handleCancel = () => {
    clearState()
    history.push('/countries')
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
    <div>
      <Row>
        <PageTitle
          text={country ? `Edit country: ${country.name}` : 'Add new country'}
        />
      </Row>
    </div>
  )

}

const mapStateToProps = store => ({
  countries: store.countries.byId,
  error: store.countries.error
})

export default withRouter(connect(
  mapStateToProps
)(CountryEditPage))