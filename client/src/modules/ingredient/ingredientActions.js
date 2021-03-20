import {
  getAll,
  addEntity,
  updateEntity,
  removeEntity
} from '../core'
import {
  getFoodstuffs
} from '../foodstuff/foodstuffActions'

export const INGREDIENT_CREATE_BEGIN = 'INGREDIENT_CREATE_BEGIN'
export const INGREDIENT_CREATE_SUCCESS = 'INGREDIENT_CREATE_SUCCESS'
export const INGREDIENT_CREATE_FAILURE = 'INGREDIENT_CREATE_FAILURE'
export const INGREDIENT_READ_BEGIN = 'INGREDIENT_READ_BEGIN'
export const INGREDIENT_READ_SUCCESS = 'INGREDIENT_READ_SUCCESS'
export const INGREDIENT_READ_FAILURE = 'INGREDIENT_READ_FAILURE'
export const INGREDIENT_UPDATE_BEGIN = 'INGREDIENT_UPDATE_BEGIN'
export const INGREDIENT_UPDATE_SUCCESS = 'INGREDIENT_UPDATE_SUCCESS'
export const INGREDIENT_UPDATE_FAILURE = 'INGREDIENT_UPDATE_FAILURE'
export const INGREDIENT_DELETE_BEGIN = 'INGREDIENT_DELETE_BEGIN'
export const INGREDIENT_DELETE_SUCCESS = 'INGREDIENT_DELETE_SUCCESS'
export const INGREDIENT_DELETE_FAILURE = 'INGREDIENT_DELETE_FAILURE'

export const createIngredientBegin = () => ({
  type: INGREDIENT_CREATE_BEGIN
})

export const createIngredientSuccess = ingredient => ({
  type: INGREDIENT_CREATE_SUCCESS,
  payload: { ingredient }
})

export const createIngredientFailure = error => ({
  type: INGREDIENT_CREATE_FAILURE,
  payload: { error }
})

export const getIngredientsBegin = () => ({
  type: INGREDIENT_READ_BEGIN
})

export const getIngredientsSuccess = ingredients => ({
  type: INGREDIENT_READ_SUCCESS,
  payload: { ingredients }
})

export const getIngredientsFailure = error => ({
  type: INGREDIENT_READ_FAILURE,
  payload: { error }
})

export const updateIngredientBegin = () => ({
  type: INGREDIENT_UPDATE_BEGIN
})

export const updateIngredientSuccess = (ingredient, oldFoodstuffId) => ({
  type: INGREDIENT_UPDATE_SUCCESS,
  payload: { ingredient, oldFoodstuffId }
})

export const updateIngredientFailure = error => ({
  type: INGREDIENT_UPDATE_FAILURE,
  payload: { error }
})

export const ingredientDeleteBegin = () => ({
  type: INGREDIENT_DELETE_BEGIN
})

export const ingredientDeleteSuccess = (ingredientId, foodstuffId) => ({
  type: INGREDIENT_DELETE_SUCCESS,
  payload: { ingredientId, foodstuffId }
})

export const ingredientDeleteFailure = error => ({
  type: INGREDIENT_DELETE_FAILURE,
  payload: { error }
})

export const getIngredients = () => {
  console.log('getting ingredients')
  return async (dispatch) => {
    dispatch(getFoodstuffs())
    dispatch(getIngredientsBegin())
    try {
      const ingredients = await getAll('ingredients')
      dispatch(getIngredientsSuccess(ingredients))
    } catch (exception) {
      console.log(exception)
      dispatch(getIngredientsFailure(exception))
    }
  }
}

export const saveIngredient = (ingredient) => {
  return async (dispatch) => {
    if (ingredient._id) {
      dispatch(updateIngredientBegin())
      try {
        const oldFoodstuffId = ingredient.oldFoodstuffId
        ingredient = await updateEntity('ingredients', ingredient)
        dispatch(updateIngredientSuccess(ingredient, oldFoodstuffId))
      } catch (exception) {
        console.log('error!', exception)
        dispatch(updateIngredientFailure(exception))
      }
    } else {
      dispatch(createIngredientBegin())
      try {
        ingredient = await addEntity('ingredients', ingredient)
        dispatch(createIngredientSuccess(ingredient))
      } catch (exception) {
        dispatch(createIngredientFailure(exception))
      }
    }
  }
}

export const deleteIngredient = (ingredientId, { foodstuffId }) => {
  return async (dispatch) => {
    dispatch(ingredientDeleteBegin())
    try {
      await removeEntity('ingredients', ingredientId)
      console.log('sending delete success')
      console.log(ingredientId)
      console.log(foodstuffId)
      dispatch(ingredientDeleteSuccess(ingredientId, foodstuffId))
    } catch (exception) {
      console.log('sending delete failure')
      dispatch(ingredientDeleteFailure(exception))
    }
  }
}