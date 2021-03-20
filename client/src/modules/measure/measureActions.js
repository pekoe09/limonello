import {
  getAll,
  addEntity,
  updateEntity,
  removeEntity
} from '../core'
import {
  getMeasureTypes
} from '../measureType/measureTypeActions'

export const MEASURE_CREATE_BEGIN = 'MEASURE_CREATE_BEGIN'
export const MEASURE_CREATE_SUCCESS = 'MEASURE_CREATE_SUCCESS'
export const MEASURE_CREATE_FAILURE = 'MEASURE_CREATE_FAILURE'
export const MEASURE_READ_BEGIN = 'MEASURE_READ_BEGIN'
export const MEASURE_READ_SUCCESS = 'MEASURE_READ_SUCCESS'
export const MEASURE_READ_FAILURE = 'MEASURE_READ_FAILURE'
export const MEASURE_UPDATE_BEGIN = 'MEASURE_UPDATE_BEGIN'
export const MEASURE_UPDATE_SUCCESS = 'MEASURE_UPDATE_SUCCESS'
export const MEASURE_UPDATE_FAILURE = 'MEASURE_UPDATE_FAILURE'
export const MEASURE_DELETE_BEGIN = 'MEASURE_DELETE_BEGIN'
export const MEASURE_DELETE_SUCCESS = 'MEASURE_DELETE_SUCCESS'
export const MEASURE_DELETE_FAILURE = 'MEASURE_DELETE_FAILURE'

export const createMeasureBegin = () => ({
  type: MEASURE_CREATE_BEGIN
})

export const createMeasureSuccess = measure => ({
  type: MEASURE_CREATE_SUCCESS,
  payload: { measure }
})

export const createMeasureFailure = error => ({
  type: MEASURE_CREATE_FAILURE,
  payload: { error }
})

export const getMeasuresBegin = () => ({
  type: MEASURE_READ_BEGIN
})

export const getMeasuresSuccess = measures => ({
  type: MEASURE_READ_SUCCESS,
  payload: { measures }
})

export const getMeasuresFailure = error => ({
  type: MEASURE_READ_FAILURE,
  payload: { error }
})

export const updateMeasureBegin = () => ({
  type: MEASURE_UPDATE_BEGIN
})

export const updateMeasureSuccess = (measure, oldMeasureTypeId) => ({
  type: MEASURE_UPDATE_SUCCESS,
  payload: { measure, oldMeasureTypeId }
})

export const updateMeasureFailure = error => ({
  type: MEASURE_UPDATE_FAILURE,
  payload: { error }
})

export const measureDeleteBegin = () => ({
  type: MEASURE_DELETE_BEGIN
})

export const measureDeleteSuccess = (measureId, measureTypeId) => ({
  type: MEASURE_DELETE_SUCCESS,
  payload: { measureId, measureTypeId }
})

export const measureDeleteFailure = error => ({
  type: MEASURE_DELETE_FAILURE,
  payload: { error }
})

export const getMeasures = () => {
  console.log('getting measures')
  return async (dispatch) => {
    dispatch(getMeasureTypes())
    dispatch(getMeasuresBegin())
    try {
      const measures = await getAll('measures')
      dispatch(getMeasuresSuccess(measures))
    } catch (exception) {
      console.log(exception)
      dispatch(getMeasuresFailure(exception))
    }
  }
}

export const saveMeasure = (measure) => {
  return async (dispatch) => {
    if (measure._id) {
      dispatch(updateMeasureBegin())
      try {
        const oldMeasureTypeId = measure.oldMeasureTypeId
        measure = await updateEntity('measures', measure)
        dispatch(updateMeasureSuccess(measure, oldMeasureTypeId))
      } catch (exception) {
        console.log('error!', exception)
        dispatch(updateMeasureFailure(exception))
      }
    } else {
      dispatch(createMeasureBegin())
      try {
        measure = await addEntity('measures', measure)
        dispatch(createMeasureSuccess(measure))
      } catch (exception) {
        dispatch(createMeasureFailure(exception))
      }
    }
  }
}

export const deleteMeasure = (measureId, { measureTypeId }) => {
  return async (dispatch) => {
    dispatch(measureDeleteBegin())
    try {
      await removeEntity('measures', measureId)
      console.log('sending delete success')
      console.log(measureId)
      console.log(measureTypeId)
      dispatch(measureDeleteSuccess(measureId, measureTypeId))
    } catch (exception) {
      console.log('sending delete failure')
      dispatch(measureDeleteFailure(exception))
    }
  }
}