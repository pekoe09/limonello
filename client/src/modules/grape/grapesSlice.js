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

const grapesAdapter = createEntityAdapter({
  selectId: grape => grape._id
})

export const getGrapes = createAsyncThunk(
  'grapes/getGrapes',
  async () => {
    const grapes = await getAll('grapes')
    return grapes
  }
)

export const addGrape = createAsyncThunk(
  'grapes/addGrape',
  async grape => {
    grape = await addEntity('grapes', grape)
    return grape
  }
)

export const updateGrape = createAsyncThunk(
  'grapes/updateGrape',
  async changeItem => {
    const grape = await updateEntity('grapes', changeItem.changes)
    return { id: grape._id, changes: grape }
  }
)

export const deleteGrape = createAsyncThunk(
  'grapes/deleteGrape',
  async grapeId => {
    await removeEntity('grapes', grapeId)
    return grapeId
  }
)

const initialState = grapesAdapter.getInitialState({
  status: 'idle',
  error: null
})

const grapesSlice = createSlice({
  name: 'grapes',
  initialState,
  reducers: {},
  extraReducers: {
    [getGrapes.pending]: (state, action) => {
      state.status = 'pending'
    },
    [getGrapes.fulfilled]: (state, action) => {
      grapesAdapter.upsertMany(state, action.payload)
      state.status = 'succeeded'
    },
    [getGrapes.rejected]: (state, action) => {
      state.status = 'failed'
      state.error = action.error.message
    },
    [addGrape.fulfilled]: grapesAdapter.addOne,
    [addGrape.rejected]: (state, action) => {
      state.status = 'failed'
      state.error = action.error.message
    },
    [updateGrape.fulfilled]: grapesAdapter.updateOne,
    [updateGrape.rejected]: (state, action) => {
      state.status = 'failed'
      state.status = action.error.message
    },
    [deleteGrape.fulfilled]: grapesAdapter.removeOne,
    [deleteGrape.rejected]: (state, action) => {
      state.status = 'failed'
      state.error = action.error.message
    }
  }
})

export const {
  selectById: selectGrapeById,
  selectAll: selectAllGrapes
} = grapesAdapter.getSelectors(state => state.grapes)

export default grapesSlice.reducer