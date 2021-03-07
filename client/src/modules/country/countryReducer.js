import {
  COUNTRY_CREATE_BEGIN,
  COUNTRY_CREATE_SUCCESS,
  COUNTRY_CREATE_FAILURE,
  COUNTRY_READ_BEGIN,
  COUNTRY_READ_SUCCESS,
  COUNTRY_READ_FAILURE,
  COUNTRY_UPDATE_BEGIN,
  COUNTRY_UPDATE_SUCCESS,
  COUNTRY_UPDATE_FAILURE,
  COUNTRY_DELETE_BEGIN,
  COUNTRY_DELETE_SUCCESS,
  COUNTRY_DELETE_FAILURE
} from './countryActions'

const initialState = {
  byId: {},
  allIds: [],
  currentCountry: null,
  gettingCountries: false,
  creatingCountry: false,
  updatingCountry: false,
  deletingCountry: false,
  countryError: null
}

const countryReducer = (store = initialState, action) => {
  switch (action.type) {
    case COUNTRY_CREATE_BEGIN:
      console.log('hit start creating')
      return {
        ...store,
        creatingCountry: true,
        countryError: null
      }
    case COUNTRY_CREATE_SUCCESS:
      console.log('hit create success', action.payload.country)
      const newCountry = action.payload.country
      return {
        ...store,
        byId: {
          ...store.byId,
          [newCountry._id]: newCountry
        },
        allIds: store.allIds.concat(newCountry._id),
        creatingCountry: false,
        countryError: null
      }
    case COUNTRY_CREATE_FAILURE:
      console.log('hit create failure')
      return {
        ...store,
        creatingCountry: false,
        countryError: action.payload.error
      }
    case COUNTRY_READ_BEGIN:
      console.log('hit read begin')
      return {
        ...store,
        gettingCountries: true,
        countryError: false
      }
    case COUNTRY_READ_SUCCESS:
      console.log('hit read success', action.payload.countries)
      const countries = action.payload.countries
      return {
        ...store,
        byId: countries.reduce((o, c) => {
          o[c._id] = c
          return o
        }, {}),
        allIds: countries.map(c => c._id),
        gettingCountries: false,
        countryError: false
      }
    case COUNTRY_READ_FAILURE:
      console.log('hit read failure')
      return {
        ...store,
        gettingCountries: false,
        countryError: action.payload.error
      }
    case COUNTRY_UPDATE_BEGIN:
      console.log('hit update begin')
      return {
        ...store,
        updatingCountry: true,
        countryError: null
      }
    case COUNTRY_UPDATE_SUCCESS:
      console.log('hit update success', action.payload.country, store.items)
      const country = action.payload.country
      return {
        ...store,
        byId: { ...store.byId, [country._id]: country },
        updatingCountry: false,
        countryError: null
      }
    case COUNTRY_UPDATE_FAILURE:
      console.log('hit update failure')
      return {
        ...store,
        updatingCountry: false,
        countryError: action.payload.error
      }
    case COUNTRY_DELETE_BEGIN:
      console.log('hit delete begin')
      return {
        ...store,
        deletingCountry: true,
        countryError: null
      }
    case COUNTRY_DELETE_SUCCESS:
      console.log('hit delete success', action.payload.countryId)
      const countryId = action.payload.countryId
      const { [countryId]: _, ...remaining } = store.byId
      return {
        ...store,
        byId: remaining,
        allIds: store.allIds.filter(id => id !== countryId),
        deletingCountry: false,
        countryError: null
      }
    case COUNTRY_DELETE_FAILURE:
      console.log('hit delete failure')
      return {
        ...store,
        deletingCountry: false,
        countryError: action.payload.error
      }
    default:
      console.log('hit default')
      return store
  }
}

export default countryReducer