import React from 'react'
import { Route, withRouter } from 'react-router-dom'
import {
  CountriesPage,
  CountryEditPage
} from '../../country'

const PageContainer = () => {
  return (
    <div>
      <Route exact path='/countries' render={() => <CountriesPage />} />
      <Route exact path='/countries/create' render={() => <CountryEditPage />} />
      <Route exaxt path='/countries/edit/:id' render={() => <CountryEditPage />} />
    </div>
  )
}
export default withRouter(PageContainer)