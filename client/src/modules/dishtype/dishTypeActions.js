import {
  getAll,
  addEntity,
  updateEntity,
  removeEntity
} from '../core'

export const DISHTYPE_CREATE_BEGIN = 'DISHTYPE_CREATE_BEGIN'
export const DISHTYPE_CREATE_SUCCESS = 'DISHTYPE_CREATE_SUCCESS'
export const DISHTYPE_CREATE_FAILURE = 'DISHTYPE_CREATE_FAILURE'
export const DISHTYPE_READ_BEGIN = 'DISHTYPE_READ_BEGIN'
export const DISHTYPE_READ_SUCCESS = 'DISHTYPE_READ_SUCCESS'
export const DISHTYPE_READ_FAILURE = 'DISHTYPE_READ_FAILURE'
export const DISHTYPE_UPDATE_BEGIN = 'DISHTYPE_UPDATE_BEGIN'
export const DISHTYPE_UPDATE_SUCCESS = 'DISHTYPE_UPDATE_SUCCESS'
export const DISHTYPE_UPDATE_FAILURE = 'DISHTYPE_UPDATE_FAILURE'
export const DISHTYPE_DELETE_BEGIN = 'DISHTYPE_DELETE_BEGIN'
export const DISHTYPE_DELETE_SUCCESS = 'DISHTYPE_DELETE_SUCCESS'
export const DISHTYPE_DELETE_FAILURE = 'DISHTYPE_DELETE_FAILURE'

export const createDishTypeBegin = () => ({
  type: DISHTYPE_CREATE_BEGIN
})

export const createDishTypeSuccess = dishType => ({
  type: DISHTYPE_CREATE_SUCCESS,
  payload: { dishType }
})

export const createDishTypeFailure = error => ({
  type: DISHTYPE_CREATE_FAILURE,
  payload: { error }
})

export const getDishTypesBegin = () => ({
  type: DISHTYPE_READ_BEGIN
})

export const getDishTypesSuccess = dishTypes => ({
  type: DISHTYPE_READ_SUCCESS,
  payload: { dishTypes }
})

export const getDishTypesFailure = error => ({
  type: DISHTYPE_READ_FAILURE,
  payload: { error }
})

export const updateDishTypeBegin = () => ({
  type: DISHTYPE_UPDATE_BEGIN
})

export const updateDishTypeSuccess = dishType => ({
  type: DISHTYPE_UPDATE_SUCCESS,
  payload: { dishType }
})

export const updateDishTypeFailure = error => ({
  type: DISHTYPE_UPDATE_FAILURE,
  payload: { error }
})

export const dishTypeDeleteBegin = () => ({
  type: DISHTYPE_DELETE_BEGIN
})

export const dishTypeDeleteSuccess = dishTypeId => ({
  type: DISHTYPE_DELETE_SUCCESS,
  payload: { dishTypeId }
})

export const dishTypeDeleteFailure = error => ({
  type: DISHTYPE_DELETE_FAILURE,
  payload: { error }
})

export const getDishTypes = () => {
  console.log('getting dishTypes')
  return async (dispatch) => {
    dispatch(getDishTypesBegin())
    try {
      const dishTypes = await getAll('dishTypes')
      dispatch(getDishTypesSuccess(dishTypes))
    } catch (exception) {
      console.log(exception)
      dispatch(getDishTypesFailure(exception))
    }
  }
}

export const saveDishType = dishType => {
  return async (dispatch) => {
    if (dishType._id) {
      dispatch(updateDishTypeBegin())
      try {
        dishType = await updateEntity('dishTypes', dishType)
        dispatch(updateDishTypeSuccess(dishType))
      } catch (exception) {
        dispatch(updateDishTypeFailure(exception))
      }
    } else {
      dispatch(createDishTypeBegin())
      try {
        dishType = await addEntity('dishTypes', dishType)
        dispatch(createDishTypeSuccess(dishType))
      } catch (exception) {
        dispatch(createDishTypeFailure(exception))
      }
    }
  }
}

export const deleteDishType = dishTypeId => {
  return async (dispatch) => {
    dispatch(dishTypeDeleteBegin())
    try {
      await removeEntity('dishTypes', dishTypeId)
      dispatch(dishTypeDeleteSuccess(dishTypeId))
    } catch (exception) {
      dispatch(dishTypeDeleteFailure(exception))
    }
  }
}