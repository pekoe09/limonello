import {
  getAll,
  addEntity,
  updateEntity,
  removeEntity
} from '../core'

export const FOODSTUFF_CREATE_BEGIN = 'FOODSTUFF_CREATE_BEGIN'
export const FOODSTUFF_CREATE_SUCCESS = 'FOODSTUFF_CREATE_SUCCESS'
export const FOODSTUFF_CREATE_FAILURE = 'FOODSTUFF_CREATE_FAILURE'
export const FOODSTUFF_READ_BEGIN = 'FOODSTUFF_READ_BEGIN'
export const FOODSTUFF_READ_SUCCESS = 'FOODSTUFF_READ_SUCCESS'
export const FOODSTUFF_READ_FAILURE = 'FOODSTUFF_READ_FAILURE'
export const FOODSTUFF_UPDATE_BEGIN = 'FOODSTUFF_UPDATE_BEGIN'
export const FOODSTUFF_UPDATE_SUCCESS = 'FOODSTUFF_UPDATE_SUCCESS'
export const FOODSTUFF_UPDATE_FAILURE = 'FOODSTUFF_UPDATE_FAILURE'
export const FOODSTUFF_DELETE_BEGIN = 'FOODSTUFF_DELETE_BEGIN'
export const FOODSTUFF_DELETE_SUCCESS = 'FOODSTUFF_DELETE_SUCCESS'
export const FOODSTUFF_DELETE_FAILURE = 'FOODSTUFF_DELETE_FAILURE'

export const createFoodstuffBegin = () => ({
  type: FOODSTUFF_CREATE_BEGIN
})

export const createFoodstuffSuccess = foodstuff => ({
  type: FOODSTUFF_CREATE_SUCCESS,
  payload: { foodstuff }
})

export const createFoodstuffFailure = error => ({
  type: FOODSTUFF_CREATE_FAILURE,
  payload: { error }
})

export const getFoodstuffsBegin = () => ({
  type: FOODSTUFF_READ_BEGIN
})

export const getFoodstuffsSuccess = foodstuffs => ({
  type: FOODSTUFF_READ_SUCCESS,
  payload: { foodstuffs }
})

export const getFoodstuffsFailure = error => ({
  type: FOODSTUFF_READ_FAILURE,
  payload: { error }
})

export const updateFoodstuffBegin = () => ({
  type: FOODSTUFF_UPDATE_BEGIN
})

export const updateFoodstuffSuccess = foodstuff => ({
  type: FOODSTUFF_UPDATE_SUCCESS,
  payload: { foodstuff }
})

export const updateFoodstuffFailure = error => ({
  type: FOODSTUFF_UPDATE_FAILURE,
  payload: { error }
})

export const foodstuffDeleteBegin = () => ({
  type: FOODSTUFF_DELETE_BEGIN
})

export const foodstuffDeleteSuccess = foodstuffId => ({
  type: FOODSTUFF_DELETE_SUCCESS,
  payload: { foodstuffId }
})

export const foodstuffDeleteFailure = error => ({
  type: FOODSTUFF_DELETE_FAILURE,
  payload: { error }
})

export const getFoodstuffs = () => {
  console.log('getting foodstuffs')
  return async (dispatch) => {
    dispatch(getFoodstuffsBegin())
    try {
      const foodstuffs = await getAll('foodstuffs')
      dispatch(getFoodstuffsSuccess(foodstuffs))
    } catch (exception) {
      console.log(exception)
      dispatch(getFoodstuffsFailure(exception))
    }
  }
}

export const saveFoodstuff = foodstuff => {
  return async (dispatch) => {
    if (foodstuff._id) {
      dispatch(updateFoodstuffBegin())
      try {
        foodstuff = await updateEntity('foodstuffs', foodstuff)
        dispatch(updateFoodstuffSuccess(foodstuff))
      } catch (exception) {
        dispatch(updateFoodstuffFailure(exception))
      }
    } else {
      dispatch(createFoodstuffBegin())
      try {
        foodstuff = await addEntity('foodstuffs', foodstuff)
        dispatch(createFoodstuffSuccess(foodstuff))
      } catch (exception) {
        dispatch(createFoodstuffFailure(exception))
      }
    }
  }
}

export const deleteFoodstuff = foodstuffId => {
  return async (dispatch) => {
    dispatch(foodstuffDeleteBegin())
    try {
      await removeEntity('foodstuffs', foodstuffId)
      dispatch(foodstuffDeleteSuccess(foodstuffId))
    } catch (exception) {
      dispatch(foodstuffDeleteFailure(exception))
    }
  }
}