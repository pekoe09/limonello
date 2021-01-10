const Grape = require('./grape')
const Region = require('./region')
const Wine = require('./wine')
const WineType = require('./wineType')
const grapeRouter = require('./grapeController')
const regionRouter = require('./regionController')
const wineRouter = require('./wineController')
const wineTypeRouter = require('./wineTypeController')

module.exports = {
  Grape,
  Region,
  Wine,
  WineType,
  grapeRouter,
  regionRouter,
  wineRouter,
  wineTypeRouter
}