import {
  createEntityAdapter,
  createSlice,
  createAsyncThunk
} from '@reduxjs/toolkit'
import {
  getAll,
  addEntity,
  updateEntity,
  removeEntity
} from '../core'

const cuisinesAdapter = createEntityAdapter({
  selectId: cuisine => cuisine._id
})

export const getCuisines = createAsyncThunk(
  'cuisines/getCuisines',
  async () => {
    const cuisines = await getAll('cuisines')
    return cuisines
  }
)

export const addCuisine = createAsyncThunk(
  'cuisines/addCuisine',
  async cuisine => {
    cuisine = await addEntity('cuisines', cuisine)
    return cuisine
  }
)

export const updateCuisine = createAsyncThunk(
  'cuisines/updateCuisine',
  async changeItem => {
    const cuisine = await updateEntity('cuisines', changeItem.changes)
    return { id: cuisine._id, changes: cuisine }
  }
)

export const deleteCuisine = createAsyncThunk(
  'cuisines/deleteCuisine',
  async cuisineId => {
    await removeEntity('cuisines', cuisineId)
    return cuisineId
  }
)

const initialState = cuisinesAdapter.getInitialState({
  status: 'idle',
  error: null
})

const cuisinesSlice = createSlice({
  name: 'cuisines',
  initialState,
  reducers: {},
  extraReducers: {
    [getCuisines.pending]: (state, action) => {
      state.status = 'pending'
    },
    [getCuisines.fulfilled]: (state, action) => {
      cuisinesAdapter.upsertMany(state, action.payload)
      state.status = 'succeeded'
    },
    [getCuisines.rejected]: (state, action) => {
      state.status = 'failed'
      state.error = action.error.message
    },
    [addCuisine.fulfilled]: cuisinesAdapter.addOne,
    [addCuisine.rejected]: (state, action) => {
      state.status = 'failed'
      state.error = action.error.message
    },
    [updateCuisine.fulfilled]: cuisinesAdapter.updateOne,
    [updateCuisine.rejected]: (state, action) => {
      state.status = 'failed'
      state.error = action.error.message
    }
  }
})

export const {
  selectById: selectCuisineById,
  selectAll: selectAllCuisines
} = cuisinesAdapter.getSelectors(state => state.cuisines)

export default cuisinesSlice.reducer