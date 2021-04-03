import {
  getAll,
  addEntity,
  updateEntity,
  removeEntity
} from '../core'
import {
  getBeerTypes
} from '../beertype/beerTypeActions'
import {
  getCountries
} from '../country/countriesSlice'

export const BEER_CREATE_BEGIN = 'BEER_CREATE_BEGIN'
export const BEER_CREATE_SUCCESS = 'BEER_CREATE_SUCCESS'
export const BEER_CREATE_FAILURE = 'BEER_CREATE_FAILURE'
export const BEER_READ_BEGIN = 'BEER_READ_BEGIN'
export const BEER_READ_SUCCESS = 'BEER_READ_SUCCESS'
export const BEER_READ_FAILURE = 'BEER_READ_FAILURE'
export const BEER_UPDATE_BEGIN = 'BEER_UPDATE_BEGIN'
export const BEER_UPDATE_SUCCESS = 'BEER_UPDATE_SUCCESS'
export const BEER_UPDATE_FAILURE = 'BEER_UPDATE_FAILURE'
export const BEER_DELETE_BEGIN = 'BEER_DELETE_BEGIN'
export const BEER_DELETE_SUCCESS = 'BEER_DELETE_SUCCESS'
export const BEER_DELETE_FAILURE = 'BEER_DELETE_FAILURE'

export const createBeerBegin = () => ({
  type: BEER_CREATE_BEGIN
})

export const createBeerSuccess = beer => ({
  type: BEER_CREATE_SUCCESS,
  payload: { beer }
})

export const createBeerFailure = error => ({
  type: BEER_CREATE_FAILURE,
  payload: { error }
})

export const getBeersBegin = () => ({
  type: BEER_READ_BEGIN
})

export const getBeersSuccess = beers => ({
  type: BEER_READ_SUCCESS,
  payload: { beers }
})

export const getBeersFailure = error => ({
  type: BEER_READ_FAILURE,
  payload: { error }
})

export const updateBeerBegin = () => ({
  type: BEER_UPDATE_BEGIN
})

export const updateBeerSuccess = (beer, oldCountryId, oldBeerTypeId) => ({
  type: BEER_UPDATE_SUCCESS,
  payload: { beer, oldCountryId, oldBeerTypeId }
})

export const updateBeerFailure = error => ({
  type: BEER_UPDATE_FAILURE,
  payload: { error }
})

export const beerDeleteBegin = () => ({
  type: BEER_DELETE_BEGIN
})

export const beerDeleteSuccess = (beerId, countryId, beerTypeId) => ({
  type: BEER_DELETE_SUCCESS,
  payload: { beerId, countryId, beerTypeId }
})

export const beerDeleteFailure = error => ({
  type: BEER_DELETE_FAILURE,
  payload: { error }
})

export const getBeers = () => {
  console.log('getting beers')
  return async (dispatch) => {
    dispatch(getBeerTypes())
    dispatch(getCountries())
    dispatch(getBeersBegin())
    try {
      const beers = await getAll('beers')
      console.log('got beers', beers)
      dispatch(getBeersSuccess(beers))
    } catch (exception) {
      console.log(exception)
      dispatch(getBeersFailure(exception))
    }
  }
}

export const saveBeer = (beer) => {
  return async (dispatch) => {
    if (beer._id) {
      dispatch(updateBeerBegin())
      try {
        const oldCountryId = beer.oldCountryId
        const oldBeerTypeId = beer.oldBeerTypeId
        beer = await updateEntity('beers', beer)
        dispatch(updateBeerSuccess(beer, oldCountryId, oldBeerTypeId))
      } catch (exception) {
        console.log('error!', exception)
        dispatch(updateBeerFailure(exception))
      }
    } else {
      dispatch(createBeerBegin())
      try {
        beer = await addEntity('beers', beer)
        dispatch(createBeerSuccess(beer))
      } catch (exception) {
        dispatch(createBeerFailure(exception))
      }
    }
  }
}

export const deleteBeer = (beerId, { countryId, beerTypeId }) => {
  return async (dispatch) => {
    dispatch(beerDeleteBegin())
    try {
      await removeEntity('beers', beerId)
      console.log('sending delete success')
      console.log(beerId)
      console.log(countryId)
      dispatch(beerDeleteSuccess(beerId, countryId, beerTypeId))
    } catch (exception) {
      console.log('sending delete failure')
      dispatch(beerDeleteFailure(exception))
    }
  }
}