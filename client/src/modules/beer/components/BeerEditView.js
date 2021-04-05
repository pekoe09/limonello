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
  selectAllBeerTypes
} from '../../beertype'
import {
  selectAllCountries
} from '../../country'

const BeerEditView = ({
  match,
  handleSave,
  selectItemById
}) => {
  let history = useHistory()

  const beerId = match.params.id
  let beer = useSelector(state => selectItemById(state, beerId))
  const beerTypes = Object.values(useSelector(selectAllBeerTypes))
  const initialBeerType = beer ? beerTypes.find(t => t._id === beer.beerType) : null
  const countries = Object.values(useSelector(selectAllCountries))
  const initialCountry = beer ? countries.find(c => c._id === beer.country) : null

  const [id, setId] = useState(beer ? beer._id : '')
  const [name, setName] = useState(beer ? beer.name : '')
  const [alcohol, setAlcohol] = useState(beer ? beer.alcohol : '')
  const [hoppiness, setHoppiness] = useState(beer ? beer.hoppiness : '')
  const [sweetness, setSweetness] = useState(beer ? beer.sweetness : '')
  const [stars, setStars] = useState(beer ? beer.stars : '')
  const [price, setPrice] = useState(beer ? beer.price : '')
  const [boughtFrom, setBoughtFrom] = useState(beer ? beer.boughtFrom : '')
  const [brewery, setBrewery] = useState(beer ? beer.brewery : '')
  const [comment, setComment] = useState(beer ? beer.comment : '')
  const [beerType, setBeerType] = useState(beer ? [initialBeerType] : [])
  const [oldBeerTypeId, setOldBeerTypeId] = useState(beer ? beer.beerType._id : '')
  const [country, setCountry] = useState(beer ? [initialCountry] : [])
  const [oldCountryId, setOldCountryId] = useState(beer ? beer.country._id : '')
  const [touched, setTouched] = useState({
    name: false,
    alcohol: false,
    hoppiness: false,
    sweetness: false,
    stars: false,
    price: false,
    boughtFrom: false,
    brewery: false,
    comment: false,
    beerType: false,
    country: false
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
    const beer = {
      _id: id,
      name,
      alcohol,
      hoppiness,
      sweetness,
      stars,
      price,
      boughtFrom,
      brewery,
      comment,
      beerType: beerType[0]._id,
      oldBeerTypeId,
      country: country[0]._id,
      oldCountryId
    }
    try {
      await handleSave(beer)
      clearState()
      history.push('/beers')
    } catch (error) {
      console.log('error on save', error)
    }
  }

  const handleCancel = () => {
    clearState()
    history.push('/beers')
  }

  const handleNameChange = e => setName(e.target.value)
  const handleAlcoholChange = e => setAlcohol(e.target.value)
  const handleHoppinessChange = e => setHoppiness(e.target.value)
  const handleSweetnessChange = e => setSweetness(e.target.value)
  const handleStarsChange = e => setStars(e.target.value)
  const handlePriceChange = e => setPrice(e.target.value)
  const handleBoughtFromChange = e => setBoughtFrom(e.target.value)
  const handleCommentChange = e => setComment(e.target.value)
  const handleBreweryChange = e => setBrewery(e.target.value)

  const handleBlur = field => {
    setTouched({ ...touched, [field]: true })
  }

  const validate = () => {
    return {
      name: !name,
      beerType: !beerType,
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
    setHoppiness('')
    setSweetness('')
    setStars('')
    setPrice('')
    setBoughtFrom('')
    setComment('')
    setBrewery('')
    setBeerType([])
    setOldBeerTypeId('')
    setCountry([])
    setOldCountryId('')
  }

  return (
    <div style={{ padding: 15 }}>
      <Row>
        <PageTitle
          text={beer ? `Muokkaa ${beer.name}` : 'Lisää uusi olut'}
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
          <LimonelloForm.Group controlId='beerType'>
            <LimonelloFormLabel>Oluttyyppi</LimonelloFormLabel>
            <Typeahead
              onChange={(selected) => { setBeerType(selected) }}
              options={beerTypes}
              selected={beerType}
              labelKey='name'
              id='_id'
              maxResults={10}
              isInvalid={getValidationState(errors, 'beerType')}
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
          <LimonelloForm.Group controlId='brewery'>
            <LimonelloFormLabel>Panimo</LimonelloFormLabel>
            <LimonelloForm.Control
              type='text'
              name='brewery'
              value={brewery}
              onChange={handleBreweryChange}
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
          <LimonelloForm.Group controlId='hoppiness'>
            <LimonelloFormLabel>Humalaisuus</LimonelloFormLabel>
            <LimonelloForm.Control
              type='number'
              name='hoppiness'
              min='0'
              max='5'
              value={hoppiness}
              onChange={handleHoppinessChange}
              onBlur={handleBlur}
            />
          </LimonelloForm.Group>
          <LimonelloForm.Group controlId='sweetness'>
            <LimonelloFormLabel>Makeus</LimonelloFormLabel>
            <LimonelloForm.Control
              type='number'
              name='stars'
              min='0'
              max='5'
              value={sweetness}
              onChange={handleSweetnessChange}
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

export default withRouter(BeerEditView)