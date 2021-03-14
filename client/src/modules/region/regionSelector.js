import { createSelector } from 'reselect'

const getRegions = state => {
  console.log('current state', state)
  let regions = state.regions.byId
  console.log('returning regions', regions)
  return regions
}
const getCountries = state => {
  let countries = state.countries.byId
  return countries
}

const makeGetRegionsWithCountry = () => createSelector(
  [getRegions, getCountries],
  (regions, countries) => {
    console.log('mapping regions', regions)
    console.log(countries)
    let regionsWithCountry = []
    if (regions && Object.keys(regions).length > 0) {
      console.log('started to map')
      console.log(Object.entries(regions))
      regionsWithCountry = Object.entries(regions).map(r => {
        console.log('r', r)
        r[1].country = countries[r[1].country]
        return r[1]
      })
    }
    console.log('mapped regions', regionsWithCountry)
    return regionsWithCountry
  }
)

export {
  makeGetRegionsWithCountry
}