import {
  getAll,
  addEntity,
  updateEntity,
  removeEntity
} from '../core'

export const WINETYPE_CREATE_BEGIN = 'WINETYPE_CREATE_BEGIN'
export const WINETYPE_CREATE_SUCCESS = 'WINETYPE_CREATE_SUCCESS'
export const WINETYPE_CREATE_FAILURE = 'WINETYPE_CREATE_FAILURE'
export const WINETYPE_READ_BEGIN = 'WINETYPE_READ_BEGIN'
export const WINETYPE_READ_SUCCESS = 'WINETYPE_READ_SUCCESS'
export const WINETYPE_READ_FAILURE = 'WINETYPE_READ_FAILURE'
export const WINETYPE_UPDATE_BEGIN = 'WINETYPE_UPDATE_BEGIN'
export const WINETYPE_UPDATE_SUCCESS = 'WINETYPE_UPDATE_SUCCESS'
export const WINETYPE_UPDATE_FAILURE = 'WINETYPE_UPDATE_FAILURE'
export const WINETYPE_DELETE_BEGIN = 'WINETYPE_DELETE_BEGIN'
export const WINETYPE_DELETE_SUCCESS = 'WINETYPE_DELETE_SUCCESS'
export const WINETYPE_DELETE_FAILURE = 'WINETYPE_DELETE_FAILURE'

export const createWineTypeBegin = () => ({
  type: WINETYPE_CREATE_BEGIN
})

export const createWineTypeSuccess = wineType => ({
  type: WINETYPE_CREATE_SUCCESS,
  payload: { wineType }
})

export const createWineTypeFailure = error => ({
  type: WINETYPE_CREATE_FAILURE,
  payload: { error }
})

export const getWineTypesBegin = () => ({
  type: WINETYPE_READ_BEGIN
})

export const getWineTypesSuccess = wineTypes => ({
  type: WINETYPE_READ_SUCCESS,
  payload: { wineTypes }
})

export const getWineTypesFailure = error => ({
  type: WINETYPE_READ_FAILURE,
  payload: { error }
})

export const updateWineTypeBegin = () => ({
  type: WINETYPE_UPDATE_BEGIN
})

export const updateWineTypeSuccess = wineType => ({
  type: WINETYPE_UPDATE_SUCCESS,
  payload: { wineType }
})

export const updateWineTypeFailure = error => ({
  type: WINETYPE_UPDATE_FAILURE,
  payload: { error }
})

export const wineTypeDeleteBegin = () => ({
  type: WINETYPE_DELETE_BEGIN
})

export const wineTypeDeleteSuccess = wineTypeId => ({
  type: WINETYPE_DELETE_SUCCESS,
  payload: { wineTypeId }
})

export const wineTypeDeleteFailure = error => ({
  type: WINETYPE_DELETE_FAILURE,
  payload: { error }
})

export const getWineTypes = () => {
  console.log('getting wineTypes')
  return async (dispatch) => {
    dispatch(getWineTypesBegin())
    try {
      const wineTypes = await getAll('wineTypes')
      dispatch(getWineTypesSuccess(wineTypes))
    } catch (exception) {
      console.log(exception)
      dispatch(getWineTypesFailure(exception))
    }
  }
}

export const saveWineType = wineType => {
  return async (dispatch) => {
    if (wineType._id) {
      dispatch(updateWineTypeBegin())
      try {
        wineType = await updateEntity('wineTypes', wineType)
        dispatch(updateWineTypeSuccess(wineType))
      } catch (exception) {
        dispatch(updateWineTypeFailure(exception))
      }
    } else {
      dispatch(createWineTypeBegin())
      try {
        wineType = await addEntity('wineTypes', wineType)
        dispatch(createWineTypeSuccess(wineType))
      } catch (exception) {
        dispatch(createWineTypeFailure(exception))
      }
    }
  }
}

export const deleteWineType = wineTypeId => {
  return async (dispatch) => {
    dispatch(wineTypeDeleteBegin())
    try {
      await removeEntity('wineTypes', wineTypeId)
      dispatch(wineTypeDeleteSuccess(wineTypeId))
    } catch (exception) {
      dispatch(wineTypeDeleteFailure(exception))
    }
  }
}