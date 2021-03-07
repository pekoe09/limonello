import {
  getAll,
  addEntity,
  updateEntity,
  removeEntity
} from '../core'

export const COUNTRY_CREATE_BEGIN = 'COUNTRY_CREATE_BEGIN'
export const COUNTRY_CREATE_SUCCESS = 'COUNTRY_CREATE_SUCCESS'
export const COUNTRY_CREATE_FAILURE = 'COUNTRY_CREATE_FAILURE'
export const COUNTRY_READ_BEGIN = 'COUNTRY_READ_BEGIN'
export const COUNTRY_READ_SUCCESS = 'COUNTRY_READ_SUCCESS'
export const COUNTRY_READ_FAILURE = 'COUNTRY_READ_FAILURE'
export const COUNTRY_UPDATE_BEGIN = 'COUNTRY_UPDATE_BEGIN'
export const COUNTRY_UPDATE_SUCCESS = 'COUNTRY_UPDATE_SUCCESS'
export const COUNTRY_UPDATE_FAILURE = 'COUNTRY_UPDATE_FAILURE'
export const COUNTRY_DELETE_BEGIN = 'COUNTRY_DELETE_BEGIN'
export const COUNTRY_DELETE_SUCCESS = 'COUNTRY_DELETE_SUCCESS'
export const COUNTRY_DELETE_FAILURE = 'COUNTRY_DELETE_FAILURE'

export const createCountryBegin = () => ({
  type: COUNTRY_CREATE_BEGIN
})

export const createCountrySuccess = country => ({
  type: COUNTRY_CREATE_SUCCESS,
  payload: { country }
})

export const createCountryFailure = error => ({
  type: COUNTRY_CREATE_FAILURE,
  payload: { error }
})

export const getCountriesBegin = () => ({
  type: COUNTRY_READ_BEGIN
})

export const getCountriesSuccess = countries => ({
  type: COUNTRY_READ_SUCCESS,
  payload: { countries }
})

export const getCountriesFailure = error => ({
  type: COUNTRY_READ_FAILURE,
  payload: { error }
})

export const updateCountryBegin = () => ({
  type: COUNTRY_UPDATE_BEGIN
})

export const updateCountrySuccess = country => ({
  type: COUNTRY_UPDATE_SUCCESS,
  payload: { country }
})

export const updateCountryFailure = error => ({
  type: COUNTRY_UPDATE_FAILURE,
  payload: { error }
})

export const countryDeleteBegin = () => ({
  type: COUNTRY_DELETE_BEGIN
})

export const countryDeleteSuccess = countryId => ({
  type: COUNTRY_DELETE_SUCCESS,
  payload: { countryId }
})

export const countryDeleteFailure = error => ({
  type: COUNTRY_DELETE_FAILURE,
  payload: { error }
})

export const getCountries = () => {
  console.log('getting countries')
  return async (dispatch) => {
    dispatch(getCountriesBegin())
    try {
      const countries = await getAll('countries')
      dispatch(getCountriesSuccess(countries))
    } catch (exception) {
      console.log(exception)
      dispatch(getCountriesFailure(exception))
    }
  }
}

export const saveCountry = country => {
  return async (dispatch) => {
    if (country._id) {
      dispatch(updateCountryBegin())
      try {
        country = await updateEntity('countries', country)
        dispatch(updateCountrySuccess(country))
      } catch (exception) {
        dispatch(updateCountryFailure(exception))
      }
    } else {
      dispatch(createCountryBegin())
      try {
        country = await addEntity('countries', country)
        dispatch(createCountrySuccess(country))
      } catch (exception) {
        dispatch(createCountryFailure(exception))
      }
    }
  }
}

export const deleteCountry = countryId => {
  return async (dispatch) => {
    dispatch(countryDeleteBegin())
    try {
      await removeEntity('countries', countryId)
      dispatch(countryDeleteSuccess(countryId))
    } catch (exception) {
      dispatch(countryDeleteFailure(exception))
    }
  }
}