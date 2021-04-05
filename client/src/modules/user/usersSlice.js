import {
  createEntityAdapter,
  createSlice,
  createAsyncThunk
} from '@reduxjs/toolkit'
import userService from './userServices'
import { getBeerTypes } from '../beertype'
import { getCountries } from '../country'
import { getCourses } from '../course'
import { getCuisines } from '../cuisine'
import { getDishTypes } from '../dishtype'
import { getFoodstuffs } from '../foodstuff'
import { getGrapes } from '../grape'
import { getIngredients } from '../ingredient'
import { getMeasures } from '../measure'
import { getMeasureTypes } from '../measureType'
import { getRegions } from '../region/regionsSlice'

const usersAdapter = createEntityAdapter({
  selectId: user => user._id
})

export const login = createAsyncThunk(
  'users/login',
  async (credentials, thunkAPI) => {
    const currentUser = await userService.login(credentials)
    thunkAPI.dispatch(getBeerTypes())
    thunkAPI.dispatch(getCountries())
    thunkAPI.dispatch(getCourses())
    thunkAPI.dispatch(getCuisines())
    thunkAPI.dispatch(getDishTypes())
    thunkAPI.dispatch(getFoodstuffs())
    thunkAPI.dispatch(getGrapes())
    thunkAPI.dispatch(getIngredients())
    thunkAPI.dispatch(getMeasureTypes())
    thunkAPI.dispatch(getMeasures())
    thunkAPI.dispatch(getRegions())
    return currentUser
  }
)

export const logout = createAsyncThunk(
  'users/logout',
  async () => {
    await userService.logout()
  }
)

const initialState = usersAdapter.getInitialState({
  currentUser: null,
  status: 'idle',
  error: null
})

const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {},
  extraReducers: {
    [login.pending]: (state, action) => {
      state.status = 'loading'
    },
    [login.fulfilled]: (state, action) => {
      state.currentUser = action.payload
      state.status = 'succeeded'
    },
    [login.rejected]: (state, action) => {
      state.status = 'failed'
      state.error = action.error.message
    },
    [logout.pending]: (state, action) => {
      state.status = 'loading'
    },
    [logout.fulfilled]: (state, action) => {
      state.status = 'succeeded'
    }
  }
})

export default usersSlice.reducer