import { createSelector } from 'reselect'

const getBeers = state => {
  let beers = state.beers.byId
  return beers
}
const getCountries = state => {
  let countries = state.countries.byId
  return countries
}

const getBeerTypes = state => {
  let beerTypes = state.beerTypes.byId
  return beerTypes
}

const makeGetBeersWithCountryAndType = () => createSelector(
  [getBeers, getCountries, getBeerTypes],
  (beers, countries, beerTypes) => {
    console.log('mapping beers', beers)
    console.log(countries)
    console.log(beerTypes)
    let beersWithCountryAndType = []
    if (beers && Object.keys(beers).length > 0) {
      console.log('started to map')
      console.log(Object.entries(beers))
      beersWithCountryAndType = Object.entries(beers).map(b => {
        console.log('b', b)
        b[1].country = countries[b[1].country]
        b[1].beerType = beerTypes[b[1].beerType]
        return b[1]
      })
    }
    console.log('mapped beers', beersWithCountryAndType)
    return beersWithCountryAndType
  }
)

export {
  makeGetBeersWithCountryAndType
}