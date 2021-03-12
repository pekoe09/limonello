import {
  BEERTYPE_CREATE_BEGIN,
  BEERTYPE_CREATE_SUCCESS,
  BEERTYPE_CREATE_FAILURE,
  BEERTYPE_READ_BEGIN,
  BEERTYPE_READ_SUCCESS,
  BEERTYPE_READ_FAILURE,
  BEERTYPE_UPDATE_BEGIN,
  BEERTYPE_UPDATE_SUCCESS,
  BEERTYPE_UPDATE_FAILURE,
  BEERTYPE_DELETE_BEGIN,
  BEERTYPE_DELETE_SUCCESS,
  BEERTYPE_DELETE_FAILURE
} from './beerTypeActions'

const initialState = {
  byId: {},
  allIds: [],
  currentBeerType: null,
  gettingBeerTypes: false,
  creatingBeerType: false,
  updatingBeerType: false,
  deletingBeerType: false,
  beerTypeError: null
}

const beerTypeReducer = (store = initialState, action) => {
  switch (action.type) {
    case BEERTYPE_CREATE_BEGIN:
      console.log('hit start creating')
      return {
        ...store,
        creatingBeerType: true,
        beerTypeError: null
      }
    case BEERTYPE_CREATE_SUCCESS:
      console.log('hit create success', action.payload.beerType)
      const newBeerType = action.payload.beerType
      return {
        ...store,
        byId: {
          ...store.byId,
          [newBeerType._id]: newBeerType
        },
        allIds: store.allIds.concat(newBeerType._id),
        creatingBeerType: false,
        beerTypeError: null
      }
    case BEERTYPE_CREATE_FAILURE:
      console.log('hit create failure')
      return {
        ...store,
        creatingBeerType: false,
        beerTypeError: action.payload.error
      }
    case BEERTYPE_READ_BEGIN:
      console.log('hit read begin')
      return {
        ...store,
        gettingBeerTypes: true,
        beerTypeError: false
      }
    case BEERTYPE_READ_SUCCESS:
      console.log('hit read success', action.payload.beerTypes)
      const beerTypes = action.payload.beerTypes
      return {
        ...store,
        byId: beerTypes.reduce((o, c) => {
          o[c._id] = c
          return o
        }, {}),
        allIds: beerTypes.map(c => c._id),
        gettingBeerTypes: false,
        beerTypeError: false
      }
    case BEERTYPE_READ_FAILURE:
      console.log('hit read failure')
      return {
        ...store,
        gettingBeerTypes: false,
        beerTypeError: action.payload.error
      }
    case BEERTYPE_UPDATE_BEGIN:
      console.log('hit update begin')
      return {
        ...store,
        updatingBeerType: true,
        beerTypeError: null
      }
    case BEERTYPE_UPDATE_SUCCESS:
      console.log('hit update success', action.payload.beerType, store.items)
      const beerType = action.payload.beerType
      return {
        ...store,
        byId: { ...store.byId, [beerType._id]: beerType },
        updatingBeerType: false,
        beerTypeError: null
      }
    case BEERTYPE_UPDATE_FAILURE:
      console.log('hit update failure')
      return {
        ...store,
        updatingBeerType: false,
        beerTypeError: action.payload.error
      }
    case BEERTYPE_DELETE_BEGIN:
      console.log('hit delete begin')
      return {
        ...store,
        deletingBeerType: true,
        beerTypeError: null
      }
    case BEERTYPE_DELETE_SUCCESS:
      console.log('hit delete success', action.payload.beerTypeId)
      const beerTypeId = action.payload.beerTypeId
      const { [beerTypeId]: _, ...remaining } = store.byId
      return {
        ...store,
        byId: remaining,
        allIds: store.allIds.filter(id => id !== beerTypeId),
        deletingBeerType: false,
        beerTypeError: null
      }
    case BEERTYPE_DELETE_FAILURE:
      console.log('hit delete failure')
      return {
        ...store,
        deletingBeerType: false,
        beerTypeError: action.payload.error
      }
    default:
      console.log('hit default')
      return store
  }
}

export default beerTypeReducer