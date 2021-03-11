import React from 'react'
import { Route, withRouter } from 'react-router-dom'
import {
  CountriesPage,
  CountryEditPage
} from '../../country'
import {
  CourseEditPage,
  CoursesPage
} from '../../course'

const PageContainer = () => {
  return (
    <div>
      <Route exact path='/countries' render={() => <CountriesPage />} />
      <Route exact path='/countries/create' render={() => <CountryEditPage />} />
      <Route exaxt path='/countries/edit/:id' render={() => <CountryEditPage />} />

      <Route exact path='/courses' render={() => <CoursesPage />} />
      <Route exact path='/courses/create' render={() => <CourseEditPage />} />
      <Route exact path='/courses/edit/:id' render={() => <CourseEditPage />} />
    </div>
  )
}
export default withRouter(PageContainer)