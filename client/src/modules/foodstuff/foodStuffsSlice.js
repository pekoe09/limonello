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

const foodstuffsAdapter = createEntityAdapter({
  selectId: foodstuff => foodstuff._id
})

export const getFoodstuffs = createAsyncThunk(
  'foodstuffs/getFoodstuffs',
  async () => {
    const foodstuffs = await getAll('foodstuffs')
    return foodstuffs
  }
)

export const addFoodstuff = createAsyncThunk(
  'foodstuffs/addFoodstuff',
  async foodstuff => {
    foodstuff = await addEntity('foodstuffs', foodstuff)
    return foodstuff
  }
)

export const updateFoodstuff = createAsyncThunk(
  'foodstuffs/updateFoodstuff',
  async changeItem => {
    const foodstuff = await updateEntity('foodstuffs', changeItem.changes)
    return { id: foodstuff._id, changes: foodstuff }
  }
)

export const deleteFoodstuff = createAsyncThunk(
  'foodstuffs/deleteFoodstuff',
  async foodstuffId => {
    await removeEntity('foodstuffs', foodstuffId)
    return foodstuffId
  }
)

const initialState = foodstuffsAdapter.getInitialState({
  status: 'idle',
  error: null
})

const foodstuffsSlice = createSlice({
  name: 'foodstuffs',
  initialState,
  reducers: {},
  extraReducers: {
    [getFoodstuffs.pending]: (state, action) => {
      state.status = 'pending'
    },
    [getFoodstuffs.fulfilled]: (state, action) => {
      foodstuffsAdapter.upsertMany(state, action.payload)
      state.status = 'succeeded'
    },
    [getFoodstuffs.rejected]: (state, action) => {
      state.status = 'failed'
      state.error = action.error.message
    },
    [addFoodstuff.fulfilled]: foodstuffsAdapter.addOne,
    [addFoodstuff.rejected]: (state, action) => {
      state.status = 'failed'
      state.error = action.error.message
    },
    [updateFoodstuff.fulfilled]: foodstuffsAdapter.updateOne,
    [updateFoodstuff.rejected]: (state, action) => {
      state.status = 'failed'
      state.status = action.error.message
    },
    [deleteFoodstuff.fulfilled]: foodstuffsAdapter.removeOne,
    [deleteFoodstuff.rejected]: (state, action) => {
      state.status = 'failed'
      state.error = action.error.message
    }
  }
})

export const {
  selectById: selectFoodstuffById,
  selectAll: selectAllFoodstuffs
} = foodstuffsAdapter.getSelectors(state => state.foodstuffs)

export default foodstuffsSlice.reducer