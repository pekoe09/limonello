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

const measureTypesAdapter = createEntityAdapter({
  selectId: measureType => measureType._id
})

export const getMeasureTypes = createAsyncThunk(
  'measureTypes/getMeasureTypes',
  async () => {
    const measureTypes = await getAll('measureTypes')
    return measureTypes
  }
)

export const addMeasureType = createAsyncThunk(
  'measureTypes/addMeasureType',
  async measureType => {
    measureType = await addEntity('measureTypes', measureType)
    return measureType
  }
)

export const updateMeasureType = createAsyncThunk(
  'measureTypes/updateMeasureType',
  async changeItem => {
    const measureType = await updateEntity('measureTypes', changeItem.changes)
    return { id: measureType._id, changes: measureType }
  }
)

export const deleteMeasureType = createAsyncThunk(
  'measureTypes/deleteMeasureType',
  async measureTypeId => {
    await removeEntity('measureTypes', measureTypeId)
    return measureTypeId
  }
)

const initialState = measureTypesAdapter.getInitialState({
  status: 'idle',
  error: null
})

const measureTypesSlice = createSlice({
  name: 'measureTypes',
  initialState,
  reducers: {},
  extraReducers: {
    [getMeasureTypes.pending]: (state, action) => {
      state.status = 'pending'
    },
    [getMeasureTypes.fulfilled]: (state, action) => {
      measureTypesAdapter.upsertMany(state, action.payload)
      state.status = 'succeeded'
    },
    [getMeasureTypes.rejected]: (state, action) => {
      state.status = 'failed'
      state.error = action.error.message
    },
    [addMeasureType.fulfilled]: measureTypesAdapter.addOne,
    [addMeasureType.rejected]: (state, action) => {
      state.status = 'failed'
      state.error = action.error.message
    },
    [updateMeasureType.fulfilled]: measureTypesAdapter.updateOne,
    [updateMeasureType.rejected]: (state, action) => {
      state.status = 'failed'
      state.status = action.error.message
    },
    [deleteMeasureType.fulfilled]: measureTypesAdapter.removeOne,
    [deleteMeasureType.rejected]: (state, action) => {
      state.status = 'failed'
      state.error = action.error.message
    }
  }
})

export const {
  selectById: selectMeasureTypeById,
  selectAll: selectAllMeasureTypes
} = measureTypesAdapter.getSelectors(state => state.measureTypes)

export default measureTypesSlice.reducer