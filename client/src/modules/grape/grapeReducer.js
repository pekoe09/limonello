import {
  GRAPE_CREATE_BEGIN,
  GRAPE_CREATE_SUCCESS,
  GRAPE_CREATE_FAILURE,
  GRAPE_READ_BEGIN,
  GRAPE_READ_SUCCESS,
  GRAPE_READ_FAILURE,
  GRAPE_UPDATE_BEGIN,
  GRAPE_UPDATE_SUCCESS,
  GRAPE_UPDATE_FAILURE,
  GRAPE_DELETE_BEGIN,
  GRAPE_DELETE_SUCCESS,
  GRAPE_DELETE_FAILURE
} from './grapeActions'

const initialState = {
  byId: {},
  allIds: [],
  currentGrape: null,
  gettingGrapes: false,
  creatingGrape: false,
  updatingGrape: false,
  deletingGrape: false,
  grapeError: null
}

const grapeReducer = (store = initialState, action) => {
  switch (action.type) {
    case GRAPE_CREATE_BEGIN:
      console.log('hit start creating')
      return {
        ...store,
        creatingGrape: true,
        grapeError: null
      }
    case GRAPE_CREATE_SUCCESS:
      console.log('hit create success', action.payload.grape)
      const newGrape = action.payload.grape
      return {
        ...store,
        byId: {
          ...store.byId,
          [newGrape._id]: newGrape
        },
        allIds: store.allIds.concat(newGrape._id),
        creatingGrape: false,
        grapeError: null
      }
    case GRAPE_CREATE_FAILURE:
      console.log('hit create failure')
      return {
        ...store,
        creatingGrape: false,
        grapeError: action.payload.error
      }
    case GRAPE_READ_BEGIN:
      console.log('hit read begin')
      return {
        ...store,
        gettingGrapes: true,
        grapeError: false
      }
    case GRAPE_READ_SUCCESS:
      console.log('hit read success', action.payload.grapes)
      const grapes = action.payload.grapes
      return {
        ...store,
        byId: grapes.reduce((o, c) => {
          o[c._id] = c
          return o
        }, {}),
        allIds: grapes.map(c => c._id),
        gettingGrapes: false,
        grapeError: false
      }
    case GRAPE_READ_FAILURE:
      console.log('hit read failure')
      return {
        ...store,
        gettingGrapes: false,
        grapeError: action.payload.error
      }
    case GRAPE_UPDATE_BEGIN:
      console.log('hit update begin')
      return {
        ...store,
        updatingGrape: true,
        grapeError: null
      }
    case GRAPE_UPDATE_SUCCESS:
      console.log('hit update success', action.payload.grape, store.items)
      const grape = action.payload.grape
      return {
        ...store,
        byId: { ...store.byId, [grape._id]: grape },
        updatingGrape: false,
        grapeError: null
      }
    case GRAPE_UPDATE_FAILURE:
      console.log('hit update failure')
      return {
        ...store,
        updatingGrape: false,
        grapeError: action.payload.error
      }
    case GRAPE_DELETE_BEGIN:
      console.log('hit delete begin')
      return {
        ...store,
        deletingGrape: true,
        grapeError: null
      }
    case GRAPE_DELETE_SUCCESS:
      console.log('hit delete success', action.payload.grapeId)
      const grapeId = action.payload.grapeId
      const { [grapeId]: _, ...remaining } = store.byId
      return {
        ...store,
        byId: remaining,
        allIds: store.allIds.filter(id => id !== grapeId),
        deletingGrape: false,
        grapeError: null
      }
    case GRAPE_DELETE_FAILURE:
      console.log('hit delete failure')
      return {
        ...store,
        deletingGrape: false,
        grapeError: action.payload.error
      }
    default:
      console.log('hit default')
      return store
  }
}

export default grapeReducer