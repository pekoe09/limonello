import {
  CUISINE_CREATE_BEGIN,
  CUISINE_CREATE_SUCCESS,
  CUISINE_CREATE_FAILURE,
  CUISINE_READ_BEGIN,
  CUISINE_READ_SUCCESS,
  CUISINE_READ_FAILURE,
  CUISINE_UPDATE_BEGIN,
  CUISINE_UPDATE_SUCCESS,
  CUISINE_UPDATE_FAILURE,
  CUISINE_DELETE_BEGIN,
  CUISINE_DELETE_SUCCESS,
  CUISINE_DELETE_FAILURE
} from './cuisineActions'

const initialState = {
  byId: {},
  allIds: [],
  currentCuisine: null,
  gettingCuisines: false,
  creatingCuisine: false,
  updatingCuisine: false,
  deletingCuisine: false,
  cuisineError: null
}

const cuisineReducer = (store = initialState, action) => {
  switch (action.type) {
    case CUISINE_CREATE_BEGIN:
      console.log('hit start creating')
      return {
        ...store,
        creatingCuisine: true,
        cuisineError: null
      }
    case CUISINE_CREATE_SUCCESS:
      console.log('hit create success', action.payload.cuisine)
      const newCuisine = action.payload.cuisine
      return {
        ...store,
        byId: {
          ...store.byId,
          [newCuisine._id]: newCuisine
        },
        allIds: store.allIds.concat(newCuisine._id),
        creatingCuisine: false,
        cuisineError: null
      }
    case CUISINE_CREATE_FAILURE:
      console.log('hit create failure')
      return {
        ...store,
        creatingCuisine: false,
        cuisineError: action.payload.error
      }
    case CUISINE_READ_BEGIN:
      console.log('hit read begin')
      return {
        ...store,
        gettingCuisines: true,
        cuisineError: false
      }
    case CUISINE_READ_SUCCESS:
      console.log('hit read success', action.payload.cuisines)
      const cuisines = action.payload.cuisines
      return {
        ...store,
        byId: cuisines.reduce((o, c) => {
          o[c._id] = c
          return o
        }, {}),
        allIds: cuisines.map(c => c._id),
        gettingCuisines: false,
        cuisineError: false
      }
    case CUISINE_READ_FAILURE:
      console.log('hit read failure')
      return {
        ...store,
        gettingCuisines: false,
        cuisineError: action.payload.error
      }
    case CUISINE_UPDATE_BEGIN:
      console.log('hit update begin')
      return {
        ...store,
        updatingCuisine: true,
        cuisineError: null
      }
    case CUISINE_UPDATE_SUCCESS:
      console.log('hit update success', action.payload.cuisine, store.items)
      const cuisine = action.payload.cuisine
      return {
        ...store,
        byId: { ...store.byId, [cuisine._id]: cuisine },
        updatingCuisine: false,
        cuisineError: null
      }
    case CUISINE_UPDATE_FAILURE:
      console.log('hit update failure')
      return {
        ...store,
        updatingCuisine: false,
        cuisineError: action.payload.error
      }
    case CUISINE_DELETE_BEGIN:
      console.log('hit delete begin')
      return {
        ...store,
        deletingCuisine: true,
        cuisineError: null
      }
    case CUISINE_DELETE_SUCCESS:
      console.log('hit delete success', action.payload.cuisineId)
      const cuisineId = action.payload.cuisineId
      const { [cuisineId]: _, ...remaining } = store.byId
      return {
        ...store,
        byId: remaining,
        allIds: store.allIds.filter(id => id !== cuisineId),
        deletingCuisine: false,
        cuisineError: null
      }
    case CUISINE_DELETE_FAILURE:
      console.log('hit delete failure')
      return {
        ...store,
        deletingCuisine: false,
        cuisineError: action.payload.error
      }
    default:
      console.log('hit default')
      return store
  }
}

export default cuisineReducer