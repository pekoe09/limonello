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
  cuisineReducer,
  dishTypeReducer,
  foodstuffReducer,
  grapeReducer,
  ingredientReducer,
  measureReducer,
  measureTypeReducer,
  userReducer,
  wineTypeReducer
} from './reducers'
import countryReducer from './modules/country/countriesSlice'
import courseReducer from './modules/course/coursesSlice'
import regionReducer from './modules/region/regionsSlice'

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

const persistedReducer = persistReducer(persistConfig, reducers)

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