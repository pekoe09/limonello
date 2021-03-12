import React from 'react'
import { Route, withRouter } from 'react-router-dom'
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

const PageContainer = () => {
  return (
    <div>
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
    </div>
  )
}
export default withRouter(PageContainer)