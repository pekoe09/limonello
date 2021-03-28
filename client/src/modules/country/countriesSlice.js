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

const countriesAdapter = createEntityAdapter({
  selectId: country => country._id
})

export const getCountries = createAsyncThunk(
  'countries/getCountries',
  async () => {
    const countries = await getAll('countries')
    return countries
  }
)

export const addCountry = createAsyncThunk(
  'countries/addCountry',
  async country => {
    country = await addEntity('countries', country)
    return country
  }
)

export const updateCountry = createAsyncThunk(
  'countries/updateCountry',
  async changeItem => {
    const country = await updateEntity('countries', changeItem.changes)
    return { id: country._id, changes: country }
  }
)

export const deleteCountry = createAsyncThunk(
  'countries/deleteCountry',
  async countryId => {
    await removeEntity('countries', countryId)
    return countryId
  }
)

const initialState = countriesAdapter.getInitialState({
  status: 'idle',
  error: null
})

const countriesSlice = createSlice({
  name: 'countries',
  initialState,
  reducers: {},
  extraReducers: {
    [getCountries.pending]: (state, action) => {
      state.status = 'pending'
    },
    [getCountries.fulfilled]: (state, action) => {
      countriesAdapter.upsertMany(state, action.payload)
      state.status = 'succeeded'
    },
    [getCountries.rejected]: (state, action) => {
      state.status = 'failed'
      state.error = action.error.message
    },
    [addCountry.fulfilled]: countriesAdapter.addOne,
    [addCountry.rejected]: (state, action) => {
      state.status = 'failed'
      state.error = action.error.message
    },
    [updateCountry.fulfilled]: countriesAdapter.updateOne,
    [updateCountry.rejected]: (state, action) => {
      state.status = 'failed'
      state.status = action.error.message
    },
    [deleteCountry.fulfilled]: countriesAdapter.removeOne,
    [deleteCountry.rejected]: (state, action) => {
      state.status = 'failed'
      state.error = action.error.message
    }
  }
})

export const {
  selectById: selectCountryById,
  selectAll: selectAllCountries
} = countriesAdapter.getSelectors(state => state.countries)

export default countriesSlice.reducer