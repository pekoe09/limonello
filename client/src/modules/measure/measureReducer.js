import {
  MEASURE_CREATE_BEGIN,
  MEASURE_CREATE_SUCCESS,
  MEASURE_CREATE_FAILURE,
  MEASURE_READ_BEGIN,
  MEASURE_READ_SUCCESS,
  MEASURE_READ_FAILURE,
  MEASURE_UPDATE_BEGIN,
  MEASURE_UPDATE_SUCCESS,
  MEASURE_UPDATE_FAILURE,
  MEASURE_DELETE_BEGIN,
  MEASURE_DELETE_SUCCESS,
  MEASURE_DELETE_FAILURE
} from './measureActions'

const initialState = {
  byId: {},
  allIds: [],
  currentMeasure: null,
  gettingMeasures: false,
  creatingMeasure: false,
  updatingMeasure: false,
  deletingMeasure: false,
  measureError: null
}

const measureReducer = (store = initialState, action) => {
  switch (action.type) {
    case MEASURE_CREATE_BEGIN:
      console.log('hit start creating')
      return {
        ...store,
        creatingMeasure: true,
        measureError: null
      }
    case MEASURE_CREATE_SUCCESS:
      console.log('hit create success', action.payload.measure)
      const newMeasure = action.payload.measure
      return {
        ...store,
        byId: {
          ...store.byId,
          [newMeasure._id]: newMeasure
        },
        allIds: store.allIds.concat(newMeasure._id),
        creatingMeasure: false,
        measureError: null
      }
    case MEASURE_CREATE_FAILURE:
      console.log('hit create failure')
      return {
        ...store,
        creatingMeasure: false,
        measureError: action.payload.error
      }
    case MEASURE_READ_BEGIN:
      console.log('hit read begin')
      return {
        ...store,
        gettingMeasures: true,
        measureError: false
      }
    case MEASURE_READ_SUCCESS:
      console.log('hit read success', action.payload.measures)
      const measures = action.payload.measures
      return {
        ...store,
        byId: measures.reduce((o, c) => {
          o[c._id] = c
          return o
        }, {}),
        allIds: measures.map(c => c._id),
        gettingMeasures: false,
        measureError: false
      }
    case MEASURE_READ_FAILURE:
      console.log('hit read failure')
      return {
        ...store,
        gettingMeasures: false,
        measureError: action.payload.error
      }
    case MEASURE_UPDATE_BEGIN:
      console.log('hit update begin')
      return {
        ...store,
        updatingMeasure: true,
        measureError: null
      }
    case MEASURE_UPDATE_SUCCESS:
      console.log('hit update success', action.payload.measure)
      const measure = action.payload.measure
      return {
        ...store,
        byId: { ...store.byId, [measure._id]: measure },
        updatingMeasure: false,
        measureError: null
      }
    case MEASURE_UPDATE_FAILURE:
      console.log('hit update failure')
      return {
        ...store,
        updatingMeasure: false,
        measureError: action.payload.error
      }
    case MEASURE_DELETE_BEGIN:
      console.log('hit delete begin')
      return {
        ...store,
        deletingMeasure: true,
        measureError: null
      }
    case MEASURE_DELETE_SUCCESS:
      console.log('hit delete success', action.payload.measureId)
      const measureId = action.payload.measureId
      const { [measureId]: _, ...remaining } = store.byId
      return {
        ...store,
        byId: remaining,
        allIds: store.allIds.filter(id => id !== measureId),
        deletingMeasure: false,
        measureError: null
      }
    case MEASURE_DELETE_FAILURE:
      console.log('hit delete failure', action.payload.error)
      return {
        ...store,
        deletingMeasure: false,
        measureError: action.payload.error
      }
    default:
      console.log('hit default')
      return store
  }
}

export default measureReducer