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

const wineTypesAdapter = createEntityAdapter({
  selectId: wineType => wineType._id
})

export const getWineTypes = createAsyncThunk(
  'wineTypes/getWineTypes',
  async () => {
    const wineTypes = await getAll('wineTypes')
    return wineTypes
  }
)

export const addWineType = createAsyncThunk(
  'wineTypes/addWineType',
  async wineType => {
    wineType = await addEntity('wineTypes', wineType)
    return wineType
  }
)

export const updateWineType = createAsyncThunk(
  'wineTypes/updateWineType',
  async changeItem => {
    const wineType = await updateEntity('wineTypes', changeItem.changes)
    return { id: wineType._id, changes: wineType }
  }
)

export const deleteWineType = createAsyncThunk(
  'wineTypes/deleteWineType',
  async wineTypeId => {
    await removeEntity('wineTypes', wineTypeId)
    return wineTypeId
  }
)

const initialState = wineTypesAdapter.getInitialState({
  status: 'idle',
  error: null
})

const wineTypesSlice = createSlice({
  name: 'wineTypes',
  initialState,
  reducers: {},
  extraReducers: {
    [getWineTypes.pending]: (state, action) => {
      state.status = 'pending'
    },
    [getWineTypes.fulfilled]: (state, action) => {
      wineTypesAdapter.upsertMany(state, action.payload)
      state.status = 'succeeded'
    },
    [getWineTypes.rejected]: (state, action) => {
      state.status = 'failed'
      state.error = action.error.message
    },
    [addWineType.fulfilled]: wineTypesAdapter.addOne,
    [addWineType.rejected]: (state, action) => {
      state.status = 'failed'
      state.error = action.error.message
    },
    [updateWineType.fulfilled]: wineTypesAdapter.updateOne,
    [updateWineType.rejected]: (state, action) => {
      state.status = 'failed'
      state.status = action.error.message
    },
    [deleteWineType.fulfilled]: wineTypesAdapter.removeOne,
    [deleteWineType.rejected]: (state, action) => {
      state.status = 'failed'
      state.error = action.error.message
    }
  }
})

export const {
  selectById: selectWineTypeById,
  selectAll: selectAllWineTypes
} = wineTypesAdapter.getSelectors(state => state.wineTypes)

export default wineTypesSlice.reducer