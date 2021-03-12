import {
  getAll,
  addEntity,
  updateEntity,
  removeEntity
} from '../core'

export const MEASURETYPE_CREATE_BEGIN = 'MEASURETYPE_CREATE_BEGIN'
export const MEASURETYPE_CREATE_SUCCESS = 'MEASURETYPE_CREATE_SUCCESS'
export const MEASURETYPE_CREATE_FAILURE = 'MEASURETYPE_CREATE_FAILURE'
export const MEASURETYPE_READ_BEGIN = 'MEASURETYPE_READ_BEGIN'
export const MEASURETYPE_READ_SUCCESS = 'MEASURETYPE_READ_SUCCESS'
export const MEASURETYPE_READ_FAILURE = 'MEASURETYPE_READ_FAILURE'
export const MEASURETYPE_UPDATE_BEGIN = 'MEASURETYPE_UPDATE_BEGIN'
export const MEASURETYPE_UPDATE_SUCCESS = 'MEASURETYPE_UPDATE_SUCCESS'
export const MEASURETYPE_UPDATE_FAILURE = 'MEASURETYPE_UPDATE_FAILURE'
export const MEASURETYPE_DELETE_BEGIN = 'MEASURETYPE_DELETE_BEGIN'
export const MEASURETYPE_DELETE_SUCCESS = 'MEASURETYPE_DELETE_SUCCESS'
export const MEASURETYPE_DELETE_FAILURE = 'MEASURETYPE_DELETE_FAILURE'

export const createMeasureTypeBegin = () => ({
  type: MEASURETYPE_CREATE_BEGIN
})

export const createMeasureTypeSuccess = measureType => ({
  type: MEASURETYPE_CREATE_SUCCESS,
  payload: { measureType }
})

export const createMeasureTypeFailure = error => ({
  type: MEASURETYPE_CREATE_FAILURE,
  payload: { error }
})

export const getMeasureTypesBegin = () => ({
  type: MEASURETYPE_READ_BEGIN
})

export const getMeasureTypesSuccess = measureTypes => ({
  type: MEASURETYPE_READ_SUCCESS,
  payload: { measureTypes }
})

export const getMeasureTypesFailure = error => ({
  type: MEASURETYPE_READ_FAILURE,
  payload: { error }
})

export const updateMeasureTypeBegin = () => ({
  type: MEASURETYPE_UPDATE_BEGIN
})

export const updateMeasureTypeSuccess = measureType => ({
  type: MEASURETYPE_UPDATE_SUCCESS,
  payload: { measureType }
})

export const updateMeasureTypeFailure = error => ({
  type: MEASURETYPE_UPDATE_FAILURE,
  payload: { error }
})

export const measureTypeDeleteBegin = () => ({
  type: MEASURETYPE_DELETE_BEGIN
})

export const measureTypeDeleteSuccess = measureTypeId => ({
  type: MEASURETYPE_DELETE_SUCCESS,
  payload: { measureTypeId }
})

export const measureTypeDeleteFailure = error => ({
  type: MEASURETYPE_DELETE_FAILURE,
  payload: { error }
})

export const getMeasureTypes = () => {
  console.log('getting measureTypes')
  return async (dispatch) => {
    dispatch(getMeasureTypesBegin())
    try {
      const measureTypes = await getAll('measureTypes')
      dispatch(getMeasureTypesSuccess(measureTypes))
    } catch (exception) {
      console.log(exception)
      dispatch(getMeasureTypesFailure(exception))
    }
  }
}

export const saveMeasureType = measureType => {
  return async (dispatch) => {
    if (measureType._id) {
      dispatch(updateMeasureTypeBegin())
      try {
        measureType = await updateEntity('measureTypes', measureType)
        dispatch(updateMeasureTypeSuccess(measureType))
      } catch (exception) {
        dispatch(updateMeasureTypeFailure(exception))
      }
    } else {
      dispatch(createMeasureTypeBegin())
      try {
        measureType = await addEntity('measureTypes', measureType)
        dispatch(createMeasureTypeSuccess(measureType))
      } catch (exception) {
        dispatch(createMeasureTypeFailure(exception))
      }
    }
  }
}

export const deleteMeasureType = measureTypeId => {
  return async (dispatch) => {
    dispatch(measureTypeDeleteBegin())
    try {
      await removeEntity('measureTypes', measureTypeId)
      dispatch(measureTypeDeleteSuccess(measureTypeId))
    } catch (exception) {
      dispatch(measureTypeDeleteFailure(exception))
    }
  }
}