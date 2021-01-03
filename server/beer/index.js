const { models } = require('mongoose')
const Beer = require('./beer')
const BeerType = require('./beerType')
const beerRouter = require('./beerController')
const beerTypeRouter = require('./beerTypeController')

module.exports = {
  Beer,
  BeerType,
  beerRouter,
  beerTypeRouter
}