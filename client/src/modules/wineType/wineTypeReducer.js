import {
  WINETYPE_CREATE_BEGIN,
  WINETYPE_CREATE_SUCCESS,
  WINETYPE_CREATE_FAILURE,
  WINETYPE_READ_BEGIN,
  WINETYPE_READ_SUCCESS,
  WINETYPE_READ_FAILURE,
  WINETYPE_UPDATE_BEGIN,
  WINETYPE_UPDATE_SUCCESS,
  WINETYPE_UPDATE_FAILURE,
  WINETYPE_DELETE_BEGIN,
  WINETYPE_DELETE_SUCCESS,
  WINETYPE_DELETE_FAILURE
} from './wineTypeActions'

const initialState = {
  byId: {},
  allIds: [],
  currentWineType: null,
  gettingWineTypes: false,
  creatingWineType: false,
  updatingWineType: false,
  deletingWineType: false,
  wineTypeError: null
}

const wineTypeReducer = (store = initialState, action) => {
  switch (action.type) {
    case WINETYPE_CREATE_BEGIN:
      console.log('hit start creating')
      return {
        ...store,
        creatingWineType: true,
        wineTypeError: null
      }
    case WINETYPE_CREATE_SUCCESS:
      console.log('hit create success', action.payload.wineType)
      const newWineType = action.payload.wineType
      return {
        ...store,
        byId: {
          ...store.byId,
          [newWineType._id]: newWineType
        },
        allIds: store.allIds.concat(newWineType._id),
        creatingWineType: false,
        wineTypeError: null
      }
    case WINETYPE_CREATE_FAILURE:
      console.log('hit create failure')
      return {
        ...store,
        creatingWineType: false,
        wineTypeError: action.payload.error
      }
    case WINETYPE_READ_BEGIN:
      console.log('hit read begin')
      return {
        ...store,
        gettingWineTypes: true,
        wineTypeError: false
      }
    case WINETYPE_READ_SUCCESS:
      console.log('hit read success', action.payload.wineTypes)
      const wineTypes = action.payload.wineTypes
      return {
        ...store,
        byId: wineTypes.reduce((o, c) => {
          o[c._id] = c
          return o
        }, {}),
        allIds: wineTypes.map(c => c._id),
        gettingWineTypes: false,
        wineTypeError: false
      }
    case WINETYPE_READ_FAILURE:
      console.log('hit read failure')
      return {
        ...store,
        gettingWineTypes: false,
        wineTypeError: action.payload.error
      }
    case WINETYPE_UPDATE_BEGIN:
      console.log('hit update begin')
      return {
        ...store,
        updatingWineType: true,
        wineTypeError: null
      }
    case WINETYPE_UPDATE_SUCCESS:
      console.log('hit update success', action.payload.wineType, store.items)
      const wineType = action.payload.wineType
      return {
        ...store,
        byId: { ...store.byId, [wineType._id]: wineType },
        updatingWineType: false,
        wineTypeError: null
      }
    case WINETYPE_UPDATE_FAILURE:
      console.log('hit update failure')
      return {
        ...store,
        updatingWineType: false,
        wineTypeError: action.payload.error
      }
    case WINETYPE_DELETE_BEGIN:
      console.log('hit delete begin')
      return {
        ...store,
        deletingWineType: true,
        wineTypeError: null
      }
    case WINETYPE_DELETE_SUCCESS:
      console.log('hit delete success', action.payload.wineTypeId)
      const wineTypeId = action.payload.wineTypeId
      const { [wineTypeId]: _, ...remaining } = store.byId
      return {
        ...store,
        byId: remaining,
        allIds: store.allIds.filter(id => id !== wineTypeId),
        deletingWineType: false,
        wineTypeError: null
      }
    case WINETYPE_DELETE_FAILURE:
      console.log('hit delete failure')
      return {
        ...store,
        deletingWineType: false,
        wineTypeError: action.payload.error
      }
    default:
      console.log('hit default')
      return store
  }
}

export default wineTypeReducer