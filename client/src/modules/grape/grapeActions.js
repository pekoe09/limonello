import {
  getAll,
  addEntity,
  updateEntity,
  removeEntity
} from '../core'

export const GRAPE_CREATE_BEGIN = 'GRAPE_CREATE_BEGIN'
export const GRAPE_CREATE_SUCCESS = 'GRAPE_CREATE_SUCCESS'
export const GRAPE_CREATE_FAILURE = 'GRAPE_CREATE_FAILURE'
export const GRAPE_READ_BEGIN = 'GRAPE_READ_BEGIN'
export const GRAPE_READ_SUCCESS = 'GRAPE_READ_SUCCESS'
export const GRAPE_READ_FAILURE = 'GRAPE_READ_FAILURE'
export const GRAPE_UPDATE_BEGIN = 'GRAPE_UPDATE_BEGIN'
export const GRAPE_UPDATE_SUCCESS = 'GRAPE_UPDATE_SUCCESS'
export const GRAPE_UPDATE_FAILURE = 'GRAPE_UPDATE_FAILURE'
export const GRAPE_DELETE_BEGIN = 'GRAPE_DELETE_BEGIN'
export const GRAPE_DELETE_SUCCESS = 'GRAPE_DELETE_SUCCESS'
export const GRAPE_DELETE_FAILURE = 'GRAPE_DELETE_FAILURE'

export const createGrapeBegin = () => ({
  type: GRAPE_CREATE_BEGIN
})

export const createGrapeSuccess = grape => ({
  type: GRAPE_CREATE_SUCCESS,
  payload: { grape }
})

export const createGrapeFailure = error => ({
  type: GRAPE_CREATE_FAILURE,
  payload: { error }
})

export const getGrapesBegin = () => ({
  type: GRAPE_READ_BEGIN
})

export const getGrapesSuccess = grapes => ({
  type: GRAPE_READ_SUCCESS,
  payload: { grapes }
})

export const getGrapesFailure = error => ({
  type: GRAPE_READ_FAILURE,
  payload: { error }
})

export const updateGrapeBegin = () => ({
  type: GRAPE_UPDATE_BEGIN
})

export const updateGrapeSuccess = grape => ({
  type: GRAPE_UPDATE_SUCCESS,
  payload: { grape }
})

export const updateGrapeFailure = error => ({
  type: GRAPE_UPDATE_FAILURE,
  payload: { error }
})

export const grapeDeleteBegin = () => ({
  type: GRAPE_DELETE_BEGIN
})

export const grapeDeleteSuccess = grapeId => ({
  type: GRAPE_DELETE_SUCCESS,
  payload: { grapeId }
})

export const grapeDeleteFailure = error => ({
  type: GRAPE_DELETE_FAILURE,
  payload: { error }
})

export const getGrapes = () => {
  console.log('getting grapes')
  return async (dispatch) => {
    dispatch(getGrapesBegin())
    try {
      const grapes = await getAll('grapes')
      dispatch(getGrapesSuccess(grapes))
    } catch (exception) {
      console.log(exception)
      dispatch(getGrapesFailure(exception))
    }
  }
}

export const saveGrape = grape => {
  return async (dispatch) => {
    if (grape._id) {
      dispatch(updateGrapeBegin())
      try {
        grape = await updateEntity('grapes', grape)
        dispatch(updateGrapeSuccess(grape))
      } catch (exception) {
        dispatch(updateGrapeFailure(exception))
      }
    } else {
      dispatch(createGrapeBegin())
      try {
        grape = await addEntity('grapes', grape)
        dispatch(createGrapeSuccess(grape))
      } catch (exception) {
        dispatch(createGrapeFailure(exception))
      }
    }
  }
}

export const deleteGrape = grapeId => {
  return async (dispatch) => {
    dispatch(grapeDeleteBegin())
    try {
      await removeEntity('grapes', grapeId)
      dispatch(grapeDeleteSuccess(grapeId))
    } catch (exception) {
      dispatch(grapeDeleteFailure(exception))
    }
  }
}