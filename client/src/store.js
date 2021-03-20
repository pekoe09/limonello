import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import autoMergeLevel2 from 'redux-persist/lib/stateReconciler/autoMergeLevel2'

import {
  beerReducer,
  beerTypeReducer,
  countryReducer,
  courseReducer,
  cuisineReducer,
  dishTypeReducer,
  foodstuffReducer,
  grapeReducer,
  ingredientReducer,
  measureReducer,
  measureTypeReducer,
  regionReducer,
  userReducer,
  wineTypeReducer
} from './reducers'

const appReducer = combineReducers({
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

export const rootReducer = (state, action) => {
  if (action.type === 'LOGOUT_SUCCESS') {
    Object.keys(state).forEach(key => {
      storage.removeItem(`persist:${key}`)
    })
    state = undefined
  }
  return appReducer(state, action)
}

export const persistConfig = {
  key: 'limonello',
  storage,
  stateReconciler: autoMergeLevel2
}

const persistedReducer = persistReducer(persistConfig, rootReducer)

export const store = createStore(
  persistedReducer,
  applyMiddleware(thunk)
)

export const persistor = persistStore(store)