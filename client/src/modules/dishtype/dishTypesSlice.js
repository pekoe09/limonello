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

const dishTypesAdapter = createEntityAdapter({
  selectId: dishType => dishType._id
})

export const getDishTypes = createAsyncThunk(
  'dishTypes/getDishTypes',
  async () => {
    const dishTypes = await getAll('dishTypes')
    return dishTypes
  }
)

export const addDishType = createAsyncThunk(
  'dishTypes/addDishType',
  async dishType => {
    dishType = await addEntity('dishTypes', dishType)
    return dishType
  }
)

export const updateDishType = createAsyncThunk(
  'dishTypes/updateDishType',
  async changeItem => {
    const dishType = await updateEntity('dishTypes', changeItem.changes)
    return { id: dishType._id, changes: dishType }
  }
)

export const deleteDishType = createAsyncThunk(
  'dishTypes/deleteDishType',
  async dishTypeId => {
    await removeEntity('dishTypes', dishTypeId)
    return dishTypeId
  }
)

const initialState = dishTypesAdapter.getInitialState({
  status: 'idle',
  error: null
})

const dishTypesSlice = createSlice({
  name: 'dishTypes',
  initialState,
  reducers: {},
  extraReducers: {
    [getDishTypes.pending]: (state, action) => {
      state.status = 'pending'
    },
    [getDishTypes.fulfilled]: (state, action) => {
      dishTypesAdapter.upsertMany(state, action.payload)
      state.status = 'succeeded'
    },
    [getDishTypes.rejected]: (state, action) => {
      state.status = 'failed'
      state.error = action.error.message
    },
    [addDishType.fulfilled]: dishTypesAdapter.addOne,
    [addDishType.rejected]: (state, action) => {
      state.status = 'failed'
      state.error = action.error.message
    },
    [updateDishType.fulfilled]: dishTypesAdapter.updateOne,
    [updateDishType.rejected]: (state, action) => {
      state.status = 'failed'
      state.status = action.error.message
    },
    [deleteDishType.fulfilled]: dishTypesAdapter.removeOne,
    [deleteDishType.rejected]: (state, action) => {
      state.status = 'failed'
      state.error = action.error.message
    }
  }
})

export const {
  selectById: selectDishTypeById,
  selectAll: selectAllDishTypes
} = dishTypesAdapter.getSelectors(state => state.dishTypes)

export default dishTypesSlice.reducer