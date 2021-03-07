import React from 'react'
import { Route, withRouter } from 'react-router-dom'
import { CountriesPage } from '../../country'

const PageContainer = () => {
  return (
    <React.Fragment>
      <Route exact path='/countries' render={() => <CountriesPage />} />
    </React.Fragment>
  )
}
export default withRouter(PageContainer)