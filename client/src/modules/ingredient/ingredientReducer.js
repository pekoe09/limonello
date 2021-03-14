import {
  INGREDIENT_CREATE_BEGIN,
  INGREDIENT_CREATE_SUCCESS,
  INGREDIENT_CREATE_FAILURE,
  INGREDIENT_READ_BEGIN,
  INGREDIENT_READ_SUCCESS,
  INGREDIENT_READ_FAILURE,
  INGREDIENT_UPDATE_BEGIN,
  INGREDIENT_UPDATE_SUCCESS,
  INGREDIENT_UPDATE_FAILURE,
  INGREDIENT_DELETE_BEGIN,
  INGREDIENT_DELETE_SUCCESS,
  INGREDIENT_DELETE_FAILURE
} from './ingredientActions'

const initialState = {
  byId: {},
  allIds: [],
  currentIngredient: null,
  gettingIngredients: false,
  creatingIngredient: false,
  updatingIngredient: false,
  deletingIngredient: false,
  ingredientError: null
}

const ingredientReducer = (store = initialState, action) => {
  switch (action.type) {
    case INGREDIENT_CREATE_BEGIN:
      console.log('hit start creating')
      return {
        ...store,
        creatingIngredient: true,
        ingredientError: null
      }
    case INGREDIENT_CREATE_SUCCESS:
      console.log('hit create success', action.payload.ingredient)
      const newIngredient = action.payload.ingredient
      return {
        ...store,
        byId: {
          ...store.byId,
          [newIngredient._id]: newIngredient
        },
        allIds: store.allIds.concat(newIngredient._id),
        creatingIngredient: false,
        ingredientError: null
      }
    case INGREDIENT_CREATE_FAILURE:
      console.log('hit create failure')
      return {
        ...store,
        creatingIngredient: false,
        ingredientError: action.payload.error
      }
    case INGREDIENT_READ_BEGIN:
      console.log('hit read begin')
      return {
        ...store,
        gettingIngredients: true,
        ingredientError: false
      }
    case INGREDIENT_READ_SUCCESS:
      console.log('hit read success', action.payload.ingredients)
      const ingredients = action.payload.ingredients
      return {
        ...store,
        byId: ingredients.reduce((o, c) => {
          o[c._id] = c
          return o
        }, {}),
        allIds: ingredients.map(c => c._id),
        gettingIngredients: false,
        ingredientError: false
      }
    case INGREDIENT_READ_FAILURE:
      console.log('hit read failure')
      return {
        ...store,
        gettingIngredients: false,
        ingredientError: action.payload.error
      }
    case INGREDIENT_UPDATE_BEGIN:
      console.log('hit update begin')
      return {
        ...store,
        updatingIngredient: true,
        ingredientError: null
      }
    case INGREDIENT_UPDATE_SUCCESS:
      console.log('hit update success', action.payload.ingredient)
      const ingredient = action.payload.ingredient
      return {
        ...store,
        byId: { ...store.byId, [ingredient._id]: ingredient },
        updatingIngredient: false,
        ingredientError: null
      }
    case INGREDIENT_UPDATE_FAILURE:
      console.log('hit update failure')
      return {
        ...store,
        updatingIngredient: false,
        ingredientError: action.payload.error
      }
    case INGREDIENT_DELETE_BEGIN:
      console.log('hit delete begin')
      return {
        ...store,
        deletingIngredient: true,
        ingredientError: null
      }
    case INGREDIENT_DELETE_SUCCESS:
      console.log('hit delete success', action.payload.ingredientId)
      const ingredientId = action.payload.ingredientId
      const { [ingredientId]: _, ...remaining } = store.byId
      return {
        ...store,
        byId: remaining,
        allIds: store.allIds.filter(id => id !== ingredientId),
        deletingIngredient: false,
        ingredientError: null
      }
    case INGREDIENT_DELETE_FAILURE:
      console.log('hit delete failure', action.payload.error)
      return {
        ...store,
        deletingIngredient: false,
        ingredientError: action.payload.error
      }
    default:
      console.log('hit default')
      return store
  }
}

export default ingredientReducer