import {
  configureStore,
  getDefaultMiddleware
} from '@reduxjs/toolkit'
import { combineReducers } from 'redux'
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER
} from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import autoMergeLevel2 from 'redux-persist/lib/stateReconciler/autoMergeLevel2'
import {
  beerReducer,
  beerTypeReducer,
  dishTypeReducer,
  foodstuffReducer,
  grapeReducer,
  ingredientReducer,
  measureReducer,
  measureTypeReducer,
  wineTypeReducer
} from './reducers'
import countryReducer from './modules/country/countriesSlice'
import courseReducer from './modules/course/coursesSlice'
import cuisineReducer from './modules/cuisine/cuisinesSlice'
import regionReducer from './modules/region/regionsSlice'
import userReducer from './modules/user/usersSlice'

const persistConfig = {
  key: 'limonello',
  storage,
  stateReconciler: autoMergeLevel2
}

const reducers = combineReducers({
  beers: beerReducer,
  beerTypes: beerTypeReducer,
  countries: countryReducer,
  courses: courseReducer,
  cuisines: cuisineReducer,
  dishTypes: dishTypeReducer,
  foodstuffs: foodstuffReducer,
  grapes: grapeReducer,
  ingredients: ingredientReducer,
  measures: measureReducer,
  measureTypes: measureTypeReducer,
  regions: regionReducer,
  users: userReducer,
  wineTypes: wineTypeReducer
})

const rootReducer = (state, action) => {
  if (action.type === 'users/logout/fulfilled') {
    Object.keys(state).forEach(key => {
      storage.removeItem(`persist:${key}`)
    })
    localStorage.removeItem('persist:limonello')
    state = undefined
  }
  return reducers(state, action)
}

const persistedReducer = persistReducer(persistConfig, rootReducer)

const store = configureStore({
  reducer: persistedReducer,
  middleware: getDefaultMiddleware({
    serializableCheck: {
      ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER]
    }
  })
})

export default store

export const persistor = persistStore(store)