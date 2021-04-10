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
  selectAllWineTypes
} from '../../wineType'
import {
  selectAllCountries
} from '../../country'
import {
  selectAllRegionsWithCountry
} from '../../region'
import {
  selectAllGrapes
} from '../../grape'

const WineEditView = ({
  match,
  handleSave,
  selectItemById
}) => {
  let history = useHistory()

  const wineId = match.params.id
  let wine = useSelector(state => selectItemById(state, wineId))
  const wineTypes = Object.values(useSelector(selectAllWineTypes))
  const initialWineType = wine ? wineTypes.find(t => t._id === wine.wineType) : null
  const countries = Object.values(useSelector(selectAllCountries))
  const initialCountry = wine ? countries.find(c => c._id === wine.country) : null
  const regions = Object.values(useSelector(selectAllRegionsWithCountry))
  const initialRegion = wine ? regions.find(r => r._id === wine.region) : null

  const [id, setId] = useState(wine ? wine._id : '')
  const [name, setName] = useState(wine ? wine.name : '')
  const [alcohol, setAlcohol] = useState(wine ? wine.alcohol : '')
  const [stars, setStars] = useState(wine ? wine.stars : '')
  const [price, setPrice] = useState(wine ? wine.price : '')
  const [boughtFrom, setBoughtFrom] = useState(wine ? wine.boughtFrom : '')
  const [producer, setProducer] = useState(wine ? wine.producer : '')
  const [vintage, setVintage] = useState(wine ? wine.vintage : '')
  const [comment, setComment] = useState(wine ? wine.comment : '')
  const [wineType, setWineType] = useState(wine ? [initialWineType] : [])
  const [oldWineTypeId, setOldWineTypeId] = useState(wine ? wine.wineType._id : '')
  const [country, setCountry] = useState(wine ? [initialCountry] : [])
  const [oldCountryId, setOldCountryId] = useState(wine ? wine.country._id : '')
  const [region, setRegion] = useState(wine ? [initialRegion] : [])
  const [oldRegionId, setOldRegionId] = useState(wine ? wine.region._id : '')
  const [touched, setTouched] = useState({
    name: false,
    alcohol: false,
    stars: false,
    price: false,
    boughtFrom: false,
    producer: false,
    vintage: false,
    comment: false,
    wineType: false,
    country: false,
    region: false
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
    const wine = {
      _id: id,
      name,
      alcohol,
      stars,
      price,
      boughtFrom,
      producer,
      comment,
      wineType: wineType[0]._id,
      oldWineTypeId,
      country: country[0]._id,
      oldCountryId,
      region: region[0]._id,
      oldRegionId
    }
    try {
      await handleSave(wine)
      clearState()
      history.push('/wines')
    } catch (error) {
      console.log('error on save', error)
    }
  }

  const handleCancel = () => {
    clearState()
    history.push('/wines')
  }

  const handleNameChange = e => setName(e.target.value)
  const handleAlcoholChange = e => setAlcohol(e.target.value)
  const handleStarsChange = e => setStars(e.target.value)
  const handlePriceChange = e => setPrice(e.target.value)
  const handleBoughtFromChange = e => setBoughtFrom(e.target.value)
  const handleCommentChange = e => setComment(e.target.value)
  const handleProducerChange = e => setProducer(e.target.value)
  const handleVintageChange = e => setVintage(e.target.value)

  const handleBlur = field => {
    setTouched({ ...touched, [field]: true })
  }

  const validate = () => {
    return {
      name: !name,
      wineType: !wineType,
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
    setAlcohol('')
    setStars('')
    setPrice('')
    setBoughtFrom('')
    setComment('')
    setProducer('')
    setVintage('')
    setWineType([])
    setOldWineTypeId('')
    setCountry([])
    setOldCountryId('')
    setRegion([])
    setOldRegionId('')
  }

  return (
    <div style={{ padding: 15 }}>
      <Row>
        <PageTitle
          text={wine ? `Muokkaa ${wine.name}` : 'Lisää uusi viini'}
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
          <LimonelloForm.Group controlId='wineType'>
            <LimonelloFormLabel>Viinityyppi</LimonelloFormLabel>
            <Typeahead
              onChange={(selected) => { setWineType(selected) }}
              options={wineTypes}
              selected={wineType}
              labelKey='name'
              id='_id'
              maxResults={10}
              isInvalid={getValidationState(errors, 'wineType')}
            />
          </LimonelloForm.Group>
          <LimonelloForm.Group controlId='country'>
            <LimonelloFormLabel>Maa</LimonelloFormLabel>
            <Typeahead
              onChange={(selected) => { setCountry(selected) }}
              options={countries}
              selected={country}
              labelKey='name'
              id='_id'
              maxResults={10}
              isInvalid={getValidationState(errors, 'country')}
            />
          </LimonelloForm.Group>
          <LimonelloForm.Group controlId='region'>
            <LimonelloFormLabel>Alue</LimonelloFormLabel>
            <Typeahead
              onChange={(selected) => { setRegion(selected) }}
              options={regions}
              selected={region}
              labelKey='name'
              id='_id'
              maxResults={10}
              isInvalid={getValidationState(errors, 'region')}
            />
          </LimonelloForm.Group>
          <LimonelloForm.Group controlId='producer'>
            <LimonelloFormLabel>Tuottaja</LimonelloFormLabel>
            <LimonelloForm.Control
              type='text'
              name='producer'
              value={producer}
              onChange={handleProducerChange}
              onBlur={handleBlur}
            />
          </LimonelloForm.Group>
          <LimonelloForm.Group controlId='vintage'>
            <LimonelloFormLabel>Vuosikerta</LimonelloFormLabel>
            <LimonelloForm.Control
              type='number'
              min={1900}
              max={2050}
              name='vintage3'
              value={vintage}
              onChange={handleVintageChange}
              onBlur={handleBlur}
            />
          </LimonelloForm.Group>
          <LimonelloForm.Group controlId='stars'>
            <LimonelloFormLabel>Tähtiä</LimonelloFormLabel>
            <LimonelloForm.Control
              type='number'
              name='stars'
              min='0'
              max='5'
              value={stars}
              onChange={handleStarsChange}
              onBlur={handleBlur}
            />
          </LimonelloForm.Group>
          <LimonelloForm.Group controlId='alcohol'>
            <LimonelloFormLabel>Alkoholi-%</LimonelloFormLabel>
            <LimonelloForm.Control
              type='number'
              name='alcohol'
              min='0'
              max='100'
              value={alcohol}
              onChange={handleAlcoholChange}
              onBlur={handleBlur}
            />
          </LimonelloForm.Group>
          <LimonelloForm.Group controlId='price'>
            <LimonelloFormLabel>Hinta</LimonelloFormLabel>
            <LimonelloForm.Control
              type='number'
              name='price'
              min='0'
              value={price}
              onChange={handlePriceChange}
              onBlur={handleBlur}
            />
          </LimonelloForm.Group>
          <LimonelloForm.Group controlId='boughtFrom'>
            <LimonelloFormLabel>Ostopaikka</LimonelloFormLabel>
            <LimonelloForm.Control
              type='text'
              name='boughtFrom'
              value={boughtFrom}
              onChange={handleBoughtFromChange}
              onBlur={handleBlur}
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

export default withRouter(WineEditView)