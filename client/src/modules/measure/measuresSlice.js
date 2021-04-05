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
  selectAllMeasureTypes
} from '../measureType'

const measuresAdapter = createEntityAdapter({
  selectId: measure => measure._id
})

export const getMeasures = createAsyncThunk(
  'measures/getMeasures',
  async () => {
    const measures = await getAll('measures')
    return measures
  }
)

export const addMeasure = createAsyncThunk(
  'measures/addMeasure',
  async measure => {
    measure = await addEntity('measures', measure)
    return measure
  }
)

export const updateMeasure = createAsyncThunk(
  'measures/updateMeasure',
  async changeItem => {
    const measure = await updateEntity('measures', changeItem.changes)
    return { id: measure._id, changes: measure }
  }
)

export const deleteMeasure = createAsyncThunk(
  'measures/deleteMeasure',
  async measureId => {
    await removeEntity('measures', measureId)
    return measureId
  }
)

const initialState = measuresAdapter.getInitialState({
  status: 'idle',
  error: null
})

const measuresSlice = createSlice({
  name: 'measures',
  initialState,
  reducers: {},
  extraReducers: {
    [getMeasures.pending]: (state, action) => {
      state.status = 'pending'
    },
    [getMeasures.fulfilled]: (state, action) => {
      measuresAdapter.upsertMany(state, action.payload)
      state.status = 'succeeded'
    },
    [getMeasures.rejected]: (state, action) => {
      state.status = 'failed'
      state.error = action.error.message
    },
    [addMeasure.fulfilled]: measuresAdapter.addOne,
    [addMeasure.rejected]: (state, action) => {
      state.status = 'failed'
      state.error = action.error.message
    },
    [updateMeasure.fulfilled]: measuresAdapter.updateOne,
    [updateMeasure.rejected]: (state, action) => {
      state.status = 'failed'
      state.error = action.error.message
    },
    [deleteMeasure.fulfilled]: measuresAdapter.removeOne,
    [deleteMeasure.rejected]: (state, action) => {
      state.status = 'failed'
      state.error = action.error.message
    }
  }
})

export const {
  selectById: selectMeasureById,
  selectAll: selectAllMeasures
} = measuresAdapter.getSelectors(state => state.measures)

export const selectAllMeasuresWithType = createSelector(
  [selectAllMeasures, selectAllMeasureTypes],
  (measures, measureTypes) => {
    let measuresWithType = []
    if (measures && measures.length > 0) {
      measuresWithType = measures.map(b => {
        const measureType = measureTypes.find(t => t._id === b.measureType)
        const hydrated = { ...b, measureType }
        return hydrated
      })
    }
    return measuresWithType
  }
)

export default measuresSlice.reducer