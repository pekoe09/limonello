import {
  getAll,
  addEntity,
  updateEntity,
  removeEntity
} from '../core'

export const CUISINE_CREATE_BEGIN = 'CUISINE_CREATE_BEGIN'
export const CUISINE_CREATE_SUCCESS = 'CUISINE_CREATE_SUCCESS'
export const CUISINE_CREATE_FAILURE = 'CUISINE_CREATE_FAILURE'
export const CUISINE_READ_BEGIN = 'CUISINE_READ_BEGIN'
export const CUISINE_READ_SUCCESS = 'CUISINE_READ_SUCCESS'
export const CUISINE_READ_FAILURE = 'CUISINE_READ_FAILURE'
export const CUISINE_UPDATE_BEGIN = 'CUISINE_UPDATE_BEGIN'
export const CUISINE_UPDATE_SUCCESS = 'CUISINE_UPDATE_SUCCESS'
export const CUISINE_UPDATE_FAILURE = 'CUISINE_UPDATE_FAILURE'
export const CUISINE_DELETE_BEGIN = 'CUISINE_DELETE_BEGIN'
export const CUISINE_DELETE_SUCCESS = 'CUISINE_DELETE_SUCCESS'
export const CUISINE_DELETE_FAILURE = 'CUISINE_DELETE_FAILURE'

export const createCuisineBegin = () => ({
  type: CUISINE_CREATE_BEGIN
})

export const createCuisineSuccess = cuisine => ({
  type: CUISINE_CREATE_SUCCESS,
  payload: { cuisine }
})

export const createCuisineFailure = error => ({
  type: CUISINE_CREATE_FAILURE,
  payload: { error }
})

export const getCuisinesBegin = () => ({
  type: CUISINE_READ_BEGIN
})

export const getCuisinesSuccess = cuisines => ({
  type: CUISINE_READ_SUCCESS,
  payload: { cuisines }
})

export const getCuisinesFailure = error => ({
  type: CUISINE_READ_FAILURE,
  payload: { error }
})

export const updateCuisineBegin = () => ({
  type: CUISINE_UPDATE_BEGIN
})

export const updateCuisineSuccess = cuisine => ({
  type: CUISINE_UPDATE_SUCCESS,
  payload: { cuisine }
})

export const updateCuisineFailure = error => ({
  type: CUISINE_UPDATE_FAILURE,
  payload: { error }
})

export const cuisineDeleteBegin = () => ({
  type: CUISINE_DELETE_BEGIN
})

export const cuisineDeleteSuccess = cuisineId => ({
  type: CUISINE_DELETE_SUCCESS,
  payload: { cuisineId }
})

export const cuisineDeleteFailure = error => ({
  type: CUISINE_DELETE_FAILURE,
  payload: { error }
})

export const getCuisines = () => {
  console.log('getting cuisines')
  return async (dispatch) => {
    dispatch(getCuisinesBegin())
    try {
      const cuisines = await getAll('cuisines')
      dispatch(getCuisinesSuccess(cuisines))
    } catch (exception) {
      console.log(exception)
      dispatch(getCuisinesFailure(exception))
    }
  }
}

export const saveCuisine = cuisine => {
  return async (dispatch) => {
    if (cuisine._id) {
      dispatch(updateCuisineBegin())
      try {
        cuisine = await updateEntity('cuisines', cuisine)
        dispatch(updateCuisineSuccess(cuisine))
      } catch (exception) {
        dispatch(updateCuisineFailure(exception))
      }
    } else {
      dispatch(createCuisineBegin())
      try {
        cuisine = await addEntity('cuisines', cuisine)
        dispatch(createCuisineSuccess(cuisine))
      } catch (exception) {
        dispatch(createCuisineFailure(exception))
      }
    }
  }
}

export const deleteCuisine = cuisineId => {
  return async (dispatch) => {
    dispatch(cuisineDeleteBegin())
    try {
      await removeEntity('cuisines', cuisineId)
      dispatch(cuisineDeleteSuccess(cuisineId))
    } catch (exception) {
      dispatch(cuisineDeleteFailure(exception))
    }
  }
}