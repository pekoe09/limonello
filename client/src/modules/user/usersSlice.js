import {
  createEntityAdapter,
  createSlice,
  createAsyncThunk
} from '@reduxjs/toolkit'
import userService from './userServices'
import { getCountries } from '../country/countriesSlice'
import { getCuisines } from '../cuisine'
import { getRegions } from '../region/regionsSlice'

const usersAdapter = createEntityAdapter({
  selectId: user => user._id
})

export const login = createAsyncThunk(
  'users/login',
  async (credentials, thunkAPI) => {
    const currentUser = await userService.login(credentials)
    thunkAPI.dispatch(getCountries())
    thunkAPI.dispatch(getRegions())
    thunkAPI.dispatch(getCuisines())
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