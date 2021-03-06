import React from 'react'
import { Route, withRouter } from 'react-router-dom'
import {
  BeerDetailsPage,
  BeerEditPage,
  BeersPage
} from '../../beer'
import {
  BeerTypeEditPage,
  BeerTypesPage
} from '../../beertype'
import {
  CountriesPage,
  CountryEditPage
} from '../../country'
import {
  CuisineEditPage,
  CuisinesPage
} from '../../cuisine'
import {
  CourseEditPage,
  CoursesPage
} from '../../course'
import {
  DishTypeEditPage,
  DishTypesPage
} from '../../dishtype'
import {
  FoodstuffEditPage,
  FoodstuffsPage
} from '../../foodstuff'
import {
  GrapeEditPage,
  GrapesPage
} from '../../grape'
import {
  IngredientEditPage,
  IngredientsPage
} from '../../ingredient'
import {
  MeasureEditPage,
  MeasuresPage
} from '../../measure'
import {
  MeasureTypeEditPage,
  MeasureTypesPage
} from '../../measureType'
import {
  RegionEditPage,
  RegionsPage
} from '../../region'
import {
  WineTypeEditPage,
  WineTypesPage
} from '../../wineType'

const PageContainer = () => {
  return (
    <div>
      <Route exact path='/beers' render={() => <BeersPage />} />
      <Route exact path='/beers/details/:id' render={() => <BeerDetailsPage />} />
      <Route exact path='/beers/create' render={() => <BeerEditPage />} />
      <Route exact path='/beers/edit/:id' render={() => <BeerEditPage />} />

      <Route exact path='/beertypes' render={() => <BeerTypesPage />} />
      <Route exact path='/beertypes/create' render={() => <BeerTypeEditPage />} />
      <Route exact path='/beertypes/edit/:id' render={() => <BeerTypeEditPage />} />

      <Route exact path='/countries' render={() => <CountriesPage />} />
      <Route exact path='/countries/create' render={() => <CountryEditPage />} />
      <Route exaxt path='/countries/edit/:id' render={() => <CountryEditPage />} />

      <Route exact path='/courses' render={() => <CoursesPage />} />
      <Route exact path='/courses/create' render={() => <CourseEditPage />} />
      <Route exact path='/courses/edit/:id' render={() => <CourseEditPage />} />

      <Route exact path='/cuisines' render={() => <CuisinesPage />} />
      <Route exact path='/cuisines/create' render={() => <CuisineEditPage />} />
      <Route exact path='/cuisines/edit/:id' render={() => <CuisineEditPage />} />

      <Route exact path='/dishtypes' render={() => <DishTypesPage />} />
      <Route exact path='/dishtypes/create' render={() => <DishTypeEditPage />} />
      <Route exact path='/dishtypes/edit/:id' render={() => <DishTypeEditPage />} />

      <Route exact path='/foodstuffs' render={() => <FoodstuffsPage />} />
      <Route exact path='/foodstuffs/create' render={() => <FoodstuffEditPage />} />
      <Route exact path='/foodstuffs/edit/:id' render={() => <FoodstuffEditPage />} />

      <Route exact path='/grapes' render={() => <GrapesPage />} />
      <Route exact path='/grapes/create' render={() => <GrapeEditPage />} />
      <Route exact path='/grapes/edit/:id' render={() => <GrapeEditPage />} />

      <Route exact path='/ingredients' render={() => <IngredientsPage />} />
      <Route exact path='/ingredients/create' render={() => <IngredientEditPage />} />
      <Route exact path='/ingredients/edit/:id' render={() => <IngredientEditPage />} />

      <Route exact path='/measures' render={() => <MeasuresPage />} />
      <Route exact path='/measures/create' render={() => <MeasureEditPage />} />
      <Route exact path='/measures/edit/:id' render={() => <MeasureEditPage />} />

      <Route exact path='/measuretypes' render={() => <MeasureTypesPage />} />
      <Route exact path='/measuretypes/create' render={() => <MeasureTypeEditPage />} />
      <Route exact path='/measuretypes/edit/:id' render={() => <MeasureTypeEditPage />} />

      <Route exact path='/regions' render={() => <RegionsPage />} />
      <Route exact path='/regions/create' render={() => <RegionEditPage />} />
      <Route exact path='/regions/edit/:id' render={() => <RegionEditPage />} />

      <Route exact path='/winetypes' render={() => <WineTypesPage />} />
      <Route exact path='/winetypes/create' render={() => <WineTypeEditPage />} />
      <Route exact path='/winetypes/edit/:id' render={() => <WineTypeEditPage />} />
    </div>
  )
}
export default withRouter(PageContainer)