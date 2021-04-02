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
  selectAllCountries,
  selectCountryById
} from '../country/countriesSlice'
import { selectCourseById } from '../course/coursesSlice'
// import { normalize } from 'normalizr'
// import {
//   regionEntity
// } from '../core/services/normalizedSchemas'

const regionsAdapter = createEntityAdapter({
  selectId: region => region._id
})

export const getRegions = createAsyncThunk(
  'regions/getRegions',
  async () => {
    const regions = await getAll('regions')
    console.log('got regions', regions)
    //const normalized = normalize(regions, regionEntity)
    return regions
  }
)

export const addRegion = createAsyncThunk(
  'regions/addRegion',
  async region => {
    region = await addEntity('regions', region)
    return region
  }
)

export const updateRegion = createAsyncThunk(
  'regions/updateRegion',
  async changeItem => {
    const region = await updateEntity('regions', changeItem.changes)
    return { id: region._id, changes: region }
  }
)

export const deleteRegion = createAsyncThunk(
  'regions/deleteRegion',
  async regionId => {
    await removeEntity('regions', regionId)
    return regionId
  }
)

const initialState = regionsAdapter.getInitialState({
  status: 'idle',
  error: null
})

const regionsSlice = createSlice({
  name: 'regions',
  initialState,
  reducers: {},
  extraReducers: {
    [getRegions.pending]: (state, action) => {
      state.status = 'pending'
    },
    [getRegions.fulfilled]: (state, action) => {
      regionsAdapter.upsertMany(state, action.payload)
      state.status = 'succeeded'
    },
    [getRegions.rejected]: (state, action) => {
      state.status = 'failed'
      state.error = action.error.message
    },
    [addRegion.fulfilled]: regionsAdapter.addOne,
    [addRegion.rejected]: (state, action) => {
      state.status = 'failed'
      state.error = action.error.message
    },
    [updateRegion.fulfilled]: regionsAdapter.updateOne,
    [updateRegion.rejected]: (state, action) => {
      state.status = 'failed'
      state.error = action.error.message
    },
    [deleteRegion.fulfilled]: regionsAdapter.removeOne,
    [deleteRegion.rejected]: (state, action) => {
      state.status = 'failed'
      state.error = action.error.message
    }
  }
})

export const {
  selectById: selectRegionById,
  selectAll: selectAllRegions
} = regionsAdapter.getSelectors(state => state.regions)

export const selectAllRegionsWithCountry = createSelector(
  [selectAllRegions, selectAllCountries],
  (regions, countries) => {
    console.log('mapping regions', regions)
    console.log(countries)
    let regionsWithCountry = []
    if (regions && regions.length > 0) {
      console.log('started to map')
      regionsWithCountry = regions.map(r => {
        console.log('r', r)
        const country = countries.find(c => c._id === r.country)
        const hydrated = { ...r, country }
        return hydrated
      })
    }
    console.log('mapped regions', regionsWithCountry)
    return regionsWithCountry
  }
)

export default regionsSlice.reducer