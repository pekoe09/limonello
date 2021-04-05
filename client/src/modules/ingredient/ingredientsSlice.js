import {
  createEntityAdapter,
  createSlice,
  createAsyncThunk,
  createSelector
} from '@reduxjs/toolkit'
import {
  getAll,
  addEntity,
  updateEntity,
  removeEntity
} from '../core'
import {
  selectAllFoodstuffs
} from '../foodstuff'

const ingredientsAdapter = createEntityAdapter({
  selectId: ingredient => ingredient._id
})

export const getIngredients = createAsyncThunk(
  'ingredients/getIngredients',
  async () => {
    const ingredients = await getAll('ingredients')
    return ingredients
  }
)

export const addIngredient = createAsyncThunk(
  'ingredients/addIngredient',
  async ingredient => {
    ingredient = await addEntity('ingredients', ingredient)
    return ingredient
  }
)

export const updateIngredient = createAsyncThunk(
  'ingredients/updateIngredient',
  async changeItem => {
    const ingredient = await updateEntity('ingredients', changeItem.changes)
    return { id: ingredient._id, changes: ingredient }
  }
)

export const deleteIngredient = createAsyncThunk(
  'ingredients/deleteIngredient',
  async ingredientId => {
    await removeEntity('ingredients', ingredientId)
    return ingredientId
  }
)

const initialState = ingredientsAdapter.getInitialState({
  status: 'idle',
  error: null
})

const ingredientsSlice = createSlice({
  name: 'ingredients',
  initialState,
  reducers: {},
  extraReducers: {
    [getIngredients.pending]: (state, action) => {
      state.status = 'pending'
    },
    [getIngredients.fulfilled]: (state, action) => {
      ingredientsAdapter.upsertMany(state, action.payload)
      state.status = 'succeeded'
    },
    [getIngredients.rejected]: (state, action) => {
      state.status = 'failed'
      state.error = action.error.message
    },
    [addIngredient.fulfilled]: ingredientsAdapter.addOne,
    [addIngredient.rejected]: (state, action) => {
      state.status = 'failed'
      state.error = action.error.message
    },
    [updateIngredient.fulfilled]: ingredientsAdapter.updateOne,
    [updateIngredient.rejected]: (state, action) => {
      state.status = 'failed'
      state.error = action.error.message
    },
    [deleteIngredient.fulfilled]: ingredientsAdapter.removeOne,
    [deleteIngredient.rejected]: (state, action) => {
      state.status = 'failed'
      state.error = action.error.message
    }
  }
})

export const {
  selectById: selectIngredientById,
  selectAll: selectAllIngredients
} = ingredientsAdapter.getSelectors(state => state.ingredients)

export const selectAllIngredientsWithFoodstuff = createSelector(
  [selectAllIngredients, selectAllFoodstuffs],
  (ingredients, foodstuffs) => {
    let ingredientsWithFoodstuff = []
    if (ingredients && ingredients.length > 0) {
      ingredientsWithFoodstuff = ingredients.map(i => {
        const foodstuff = foodstuffs.find(f => f._id === i.foodstuff)
        const hydrated = { ...i, foodstuff }
        return hydrated
      })
    }
    return ingredientsWithFoodstuff
  }
)

export default ingredientsSlice.reducer