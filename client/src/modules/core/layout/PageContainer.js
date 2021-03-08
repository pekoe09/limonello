import React from 'react'
import { Route, withRouter } from 'react-router-dom'
import {
  CountriesPage,
  CountryEditPage
} from '../../country'

const PageContainer = () => {
  return (
    <React.Fragment>
      <Route exact path='/countries' render={() => <CountriesPage />} />
      <Route exaxt path='/countries/edit/:id' render={() => <CountryEditPage />} />
    </React.Fragment>
  )
}
export default withRouter(PageContainer)