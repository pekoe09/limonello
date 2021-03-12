import React from 'react'
import { Route, withRouter } from 'react-router-dom'
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
  MeasureTypeEditPage,
  MeasureTypesPage
} from '../../measureType'

const PageContainer = () => {
  return (
    <div>
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

      <Route exact path='/measuretypes' render={() => <MeasureTypesPage />} />
      <Route exact path='/measuretypes/create' render={() => <MeasureTypeEditPage />} />
      <Route exact path='/measuretypes/edit/:id' render={() => <MeasureTypeEditPage />} />
    </div>
  )
}
export default withRouter(PageContainer)