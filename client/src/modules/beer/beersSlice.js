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
  selectAllBeerTypes
} from '../beertype'
import {
  selectAllCountries
} from '../country'

const beersAdapter = createEntityAdapter({
  selectId: beer => beer._id
})

export const getBeers = createAsyncThunk(
  'beers/getBeers',
  async () => {
    const beers = await getAll('beers')
    return beers
  }
)

export const addBeer = createAsyncThunk(
  'beers/addBeer',
  async beer => {
    beer = await addEntity('beers', beer)
    return beer
  }
)

export const updateBeer = createAsyncThunk(
  'beers/updateBeer',
  async changeItem => {
    const beer = await updateEntity('beers', changeItem.changes)
    return { id: beer._id, changes: beer }
  }
)

export const deleteBeer = createAsyncThunk(
  'beers/deleteBeer',
  async beerId => {
    await removeEntity('beers', beerId)
    return beerId
  }
)

const initialState = beersAdapter.getInitialState({
  status: 'idle',
  error: null
})

const beersSlice = createSlice({
  name: 'beers',
  initialState,
  reducers: {},
  extraReducers: {
    [getBeers.pending]: (state, action) => {
      state.status = 'pending'
    },
    [getBeers.fulfilled]: (state, action) => {
      beersAdapter.upsertMany(state, action.payload)
      state.status = 'succeeded'
    },
    [getBeers.rejected]: (state, action) => {
      state.status = 'failed'
      state.error = action.error.message
    },
    [addBeer.fulfilled]: beersAdapter.addOne,
    [addBeer.rejected]: (state, action) => {
      state.status = 'failed'
      state.error = action.error.message
    },
    [updateBeer.fulfilled]: beersAdapter.updateOne,
    [updateBeer.rejected]: (state, action) => {
      state.status = 'failed'
      state.error = action.error.message
    },
    [deleteBeer.fulfilled]: beersAdapter.removeOne,
    [deleteBeer.rejected]: (state, action) => {
      state.status = 'failed'
      state.error = action.error.message
    }
  }
})

export const {
  selectById: selectBeerById,
  selectAll: selectAllBeers
} = beersAdapter.getSelectors(state => state.beers)

export const selectAllBeersWithTypeAndCountry = createSelector(
  [selectAllBeers, selectAllBeerTypes, selectAllCountries],
  (beers, beerTypes, countries) => {
    let beersWithTypeAndCounry = []
    if (beers && beers.length > 0) {
      beersWithTypeAndCounry = beers.map(b => {
        const beerType = beerTypes.find(t => t._id === b.beerType)
        const country = countries.find(c => c._id === b.country)
        const hydrated = { ...b, beerType, country }
        return hydrated
      })
    }
    return beersWithTypeAndCounry
  }
)

export default beersSlice.reducer