const Grape = require('./grape')
const Region = require('./region')
const WineType = require('./wineType')
const grapeRouter = require('./grapeController')
const regionRouter = require('./regionController')
const wineTypeRouter = require('./wineTypeController')

module.exports = {
  Grape,
  Region,
  WineType,
  grapeRouter,
  regionRouter,
  wineTypeRouter
}