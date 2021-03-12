import {
  MEASURETYPE_CREATE_BEGIN,
  MEASURETYPE_CREATE_SUCCESS,
  MEASURETYPE_CREATE_FAILURE,
  MEASURETYPE_READ_BEGIN,
  MEASURETYPE_READ_SUCCESS,
  MEASURETYPE_READ_FAILURE,
  MEASURETYPE_UPDATE_BEGIN,
  MEASURETYPE_UPDATE_SUCCESS,
  MEASURETYPE_UPDATE_FAILURE,
  MEASURETYPE_DELETE_BEGIN,
  MEASURETYPE_DELETE_SUCCESS,
  MEASURETYPE_DELETE_FAILURE
} from './measureTypeActions'

const initialState = {
  byId: {},
  allIds: [],
  currentMeasureType: null,
  gettingMeasureTypes: false,
  creatingMeasureType: false,
  updatingMeasureType: false,
  deletingMeasureType: false,
  measureTypeError: null
}

const measureTypeReducer = (store = initialState, action) => {
  switch (action.type) {
    case MEASURETYPE_CREATE_BEGIN:
      console.log('hit start creating')
      return {
        ...store,
        creatingMeasureType: true,
        measureTypeError: null
      }
    case MEASURETYPE_CREATE_SUCCESS:
      console.log('hit create success', action.payload.measureType)
      const newMeasureType = action.payload.measureType
      return {
        ...store,
        byId: {
          ...store.byId,
          [newMeasureType._id]: newMeasureType
        },
        allIds: store.allIds.concat(newMeasureType._id),
        creatingMeasureType: false,
        measureTypeError: null
      }
    case MEASURETYPE_CREATE_FAILURE:
      console.log('hit create failure')
      return {
        ...store,
        creatingMeasureType: false,
        measureTypeError: action.payload.error
      }
    case MEASURETYPE_READ_BEGIN:
      console.log('hit read begin')
      return {
        ...store,
        gettingMeasureTypes: true,
        measureTypeError: false
      }
    case MEASURETYPE_READ_SUCCESS:
      console.log('hit read success', action.payload.measureTypes)
      const measureTypes = action.payload.measureTypes
      return {
        ...store,
        byId: measureTypes.reduce((o, c) => {
          o[c._id] = c
          return o
        }, {}),
        allIds: measureTypes.map(c => c._id),
        gettingMeasureTypes: false,
        measureTypeError: false
      }
    case MEASURETYPE_READ_FAILURE:
      console.log('hit read failure')
      return {
        ...store,
        gettingMeasureTypes: false,
        measureTypeError: action.payload.error
      }
    case MEASURETYPE_UPDATE_BEGIN:
      console.log('hit update begin')
      return {
        ...store,
        updatingMeasureType: true,
        measureTypeError: null
      }
    case MEASURETYPE_UPDATE_SUCCESS:
      console.log('hit update success', action.payload.measureType, store.items)
      const measureType = action.payload.measureType
      return {
        ...store,
        byId: { ...store.byId, [measureType._id]: measureType },
        updatingMeasureType: false,
        measureTypeError: null
      }
    case MEASURETYPE_UPDATE_FAILURE:
      console.log('hit update failure')
      return {
        ...store,
        updatingMeasureType: false,
        measureTypeError: action.payload.error
      }
    case MEASURETYPE_DELETE_BEGIN:
      console.log('hit delete begin')
      return {
        ...store,
        deletingMeasureType: true,
        measureTypeError: null
      }
    case MEASURETYPE_DELETE_SUCCESS:
      console.log('hit delete success', action.payload.measureTypeId)
      const measureTypeId = action.payload.measureTypeId
      const { [measureTypeId]: _, ...remaining } = store.byId
      return {
        ...store,
        byId: remaining,
        allIds: store.allIds.filter(id => id !== measureTypeId),
        deletingMeasureType: false,
        measureTypeError: null
      }
    case MEASURETYPE_DELETE_FAILURE:
      console.log('hit delete failure')
      return {
        ...store,
        deletingMeasureType: false,
        measureTypeError: action.payload.error
      }
    default:
      console.log('hit default')
      return store
  }
}

export default measureTypeReducer