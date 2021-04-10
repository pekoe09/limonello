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
  selectAllWineTypes
} from '../wineType'
import {
  selectAllCountries
} from '../country'
import {
  selectAllRegionsWithCountry
} from '../region'
import {
  selectAllGrapes
} from '../grape'

const winesAdapter = createEntityAdapter({
  selectId: wine => wine._id
})

export const getWines = createAsyncThunk(
  'wines/getWines',
  async () => {
    const wines = await getAll('wines')
    return wines
  }
)

export const addWine = createAsyncThunk(
  'wines/addWine',
  async wine => {
    wine = await addEntity('wines', wine)
    return wine
  }
)

export const updateWine = createAsyncThunk(
  'wines/updateWine',
  async changeItem => {
    const wine = await updateEntity('wines', changeItem.changes)
    return { id: wine._id, changes: wine }
  }
)

export const deleteWine = createAsyncThunk(
  'wines/deleteWine',
  async wineId => {
    await removeEntity('wines', wineId)
    return wineId
  }
)

const initialState = winesAdapter.getInitialState({
  status: 'idle',
  error: null
})

const winesSlice = createSlice({
  name: 'wines',
  initialState,
  reducers: {},
  extraReducers: {
    [getWines.pending]: (state, action) => {
      state.status = 'pending'
    },
    [getWines.fulfilled]: (state, action) => {
      winesAdapter.upsertMany(state, action.payload)
      state.status = 'succeeded'
    },
    [getWines.rejected]: (state, action) => {
      state.status = 'failed'
      state.error = action.error.message
    },
    [addWine.fulfilled]: winesAdapter.addOne,
    [addWine.rejected]: (state, action) => {
      state.status = 'failed'
      state.error = action.error.message
    },
    [updateWine.fulfilled]: winesAdapter.updateOne,
    [updateWine.rejected]: (state, action) => {
      state.status = 'failed'
      state.error = action.error.message
    },
    [deleteWine.fulfilled]: winesAdapter.removeOne,
    [deleteWine.rejected]: (state, action) => {
      state.status = 'failed'
      state.error = action.error.message
    }
  }
})

export const {
  selectById: selectWineById,
  selectAll: selectAllWines
} = winesAdapter.getSelectors(state => state.wines)

export const selectAllWinesWithDetails = createSelector(
  [selectAllWines, selectAllWineTypes, selectAllCountries, selectAllRegionsWithCountry],
  (wines, wineTypes, countries, regions) => {
    let winesWithDetails = []
    if (wines && wines.length > 0) {
      winesWithDetails = wines.map(w => {
        const wineType = wineTypes.find(t => t._id === w.wineType)
        const country = countries.find(c => c._id === w.country)
        const region = regions.find(r =>r._id === w.region)
        const hydrated = { ...w, wineType, country, region }
        return hydrated
      })
    }
    return winesWithDetails
  }
)

export default winesSlice.reducer