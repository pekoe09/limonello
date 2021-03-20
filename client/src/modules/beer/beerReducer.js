import {
  BEER_CREATE_BEGIN,
  BEER_CREATE_SUCCESS,
  BEER_CREATE_FAILURE,
  BEER_READ_BEGIN,
  BEER_READ_SUCCESS,
  BEER_READ_FAILURE,
  BEER_UPDATE_BEGIN,
  BEER_UPDATE_SUCCESS,
  BEER_UPDATE_FAILURE,
  BEER_DELETE_BEGIN,
  BEER_DELETE_SUCCESS,
  BEER_DELETE_FAILURE
} from './beerActions'

const initialState = {
  byId: {},
  allIds: [],
  currentBeer: null,
  gettingBeers: false,
  creatingBeer: false,
  updatingBeer: false,
  deletingBeer: false,
  beerError: null
}

const beerReducer = (store = initialState, action) => {
  switch (action.type) {
    case BEER_CREATE_BEGIN:
      console.log('hit start creating')
      return {
        ...store,
        creatingBeer: true,
        beerError: null
      }
    case BEER_CREATE_SUCCESS:
      console.log('hit create success', action.payload.beer)
      const newBeer = action.payload.beer
      return {
        ...store,
        byId: {
          ...store.byId,
          [newBeer._id]: newBeer
        },
        allIds: store.allIds.concat(newBeer._id),
        creatingBeer: false,
        beerError: null
      }
    case BEER_CREATE_FAILURE:
      console.log('hit create failure')
      return {
        ...store,
        creatingBeer: false,
        beerError: action.payload.error
      }
    case BEER_READ_BEGIN:
      console.log('hit read begin')
      return {
        ...store,
        gettingBeers: true,
        beerError: false
      }
    case BEER_READ_SUCCESS:
      console.log('hit read success', action.payload.beers)
      const beers = action.payload.beers
      return {
        ...store,
        byId: beers.reduce((o, c) => {
          o[c._id] = c
          return o
        }, {}),
        allIds: beers.map(c => c._id),
        gettingBeers: false,
        beerError: false
      }
    case BEER_READ_FAILURE:
      console.log('hit read failure')
      return {
        ...store,
        gettingBeers: false,
        beerError: action.payload.error
      }
    case BEER_UPDATE_BEGIN:
      console.log('hit update begin')
      return {
        ...store,
        updatingBeer: true,
        beerError: null
      }
    case BEER_UPDATE_SUCCESS:
      console.log('hit update success', action.payload.beer, store.items)
      const beer = action.payload.beer
      return {
        ...store,
        byId: { ...store.byId, [beer._id]: beer },
        updatingBeer: false,
        beerError: null
      }
    case BEER_UPDATE_FAILURE:
      console.log('hit update failure')
      return {
        ...store,
        updatingBeer: false,
        beerError: action.payload.error
      }
    case BEER_DELETE_BEGIN:
      console.log('hit delete begin')
      return {
        ...store,
        deletingBeer: true,
        beerError: null
      }
    case BEER_DELETE_SUCCESS:
      console.log('hit delete success', action.payload.beerId)
      const beerId = action.payload.beerId
      const { [beerId]: _, ...remaining } = store.byId
      return {
        ...store,
        byId: remaining,
        allIds: store.allIds.filter(id => id !== beerId),
        deletingBeer: false,
        beerError: null
      }
    case BEER_DELETE_FAILURE:
      console.log('hit delete failure', action.payload.error)
      return {
        ...store,
        deletingBeer: false,
        beerError: action.payload.error
      }
    default:
      console.log('hit default')
      return store
  }
}

export default beerReducer