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

const beerTypesAdapter = createEntityAdapter({
  selectId: beerType => beerType._id
})

export const getBeerTypes = createAsyncThunk(
  'beerTypes/getBeerTypes',
  async () => {
    const beerTypes = await getAll('beerTypes')
    return beerTypes
  }
)

export const addBeerType = createAsyncThunk(
  'beerTypes/addBeerType',
  async beerType => {
    beerType = await addEntity('beerTypes', beerType)
    return beerType
  }
)

export const updateBeerType = createAsyncThunk(
  'beerTypes/updateBeerType',
  async changeItem => {
    const beerType = await updateEntity('beerTypes', changeItem.changes)
    return { id: beerType._id, changes: beerType }
  }
)

export const deleteBeerType = createAsyncThunk(
  'beerTypes/deleteBeerType',
  async beerTypeId => {
    await removeEntity('beerTypes', beerTypeId)
    return beerTypeId
  }
)

const initialState = beerTypesAdapter.getInitialState({
  status: 'idle',
  error: null
})

const beerTypesSlice = createSlice({
  name: 'beerTypes',
  initialState,
  reducers: {},
  extraReducers: {
    [getBeerTypes.pending]: (state, action) => {
      state.status = 'pending'
    },
    [getBeerTypes.fulfilled]: (state, action) => {
      beerTypesAdapter.upsertMany(state, action.payload)
      state.status = 'succeeded'
    },
    [getBeerTypes.rejected]: (state, action) => {
      state.status = 'failed'
      state.error = action.error.message
    },
    [addBeerType.fulfilled]: beerTypesAdapter.addOne,
    [addBeerType.rejected]: (state, action) => {
      state.status = 'failed'
      state.error = action.error.message
    },
    [updateBeerType.fulfilled]: beerTypesAdapter.updateOne,
    [updateBeerType.rejected]: (state, action) => {
      state.status = 'failed'
      state.status = action.error.message
    },
    [deleteBeerType.fulfilled]: beerTypesAdapter.removeOne,
    [deleteBeerType.rejected]: (state, action) => {
      state.status = 'failed'
      state.error = action.error.message
    }
  }
})

export const {
  selectById: selectBeerTypeById,
  selectAll: selectAllBeerTypes
} = beerTypesAdapter.getSelectors(state => state.beerTypes)

export default beerTypesSlice.reducer