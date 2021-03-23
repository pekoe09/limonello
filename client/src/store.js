import { configureStore } from '@reduxjs/toolkit'

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

const store = configureStore({
  reducer: {
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
  }
})

export default store