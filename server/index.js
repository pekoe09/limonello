const http = require('http')
const express = require('express')
const app = express()
const bodyparser = require('body-parser')
const cors = require('cors')
const path = require('path')
const config = require('./config')
const mongo = require('./mongo')
const { tokenExtractor } = require('./utils/tokenExtractor')
const { userExtractor } = require('./utils/userExtractor')

const { countryRouter } = require('./category')
const { courseRouter } = require('./category')
const { cuisineRouter } = require('./category')
const { dishTypeRouter } = require('./category')
const { measureRouter, measureTypeRouter } = require('./measure')
const { userRouter } = require('./user')

app.use(cors())
app.use(bodyparser.json())
app.use(tokenExtractor)
app.use(userExtractor)

app.use('/api/countries', countryRouter)
app.use('/api/courses', courseRouter)
app.use('/api/cuisines', cuisineRouter)
app.use('/api/dishtypes', dishTypeRouter)
app.use('/api/measures', measureRouter)
app.use('/api/measuretypes', measureTypeRouter)
app.use('/api/users', userRouter)

app.use(express.static('/client/public'))

app.use(express.static(path.resolve(__dirname, '../client/build')))

app.get('*', (req, res) => {
  console.log('unspecified request', req.url)
  res.sendFile(path.resolve(__dirname, '../client/build', 'index.html'))
})

app.use((err, req, res, next) => {
  console.log('General call', req.body)
  console.log(err.message)
  if (err.isBadRequest) {
    res.status(400).json({ error: err.message })
  } else if (err.isUnauthorizedAttempt) {
    res.status(401).json({ error: err.message })
  } else if (err.isForbidden) {
    res.status(403).json({ error: err.message })
  } else if (err.refPreventDeletion) {
    res.status(403).json({ error: err.message })
  } else {
    res.status(500).json({ error: 'Something has gone wrong' })
  }
})

const server = http.createServer(app)

server.listen(config.port, () => {
  console.log(`Server running on port ${config.port}`)
})

server.on('close', () => {
  console.log('Shutting down server')
  mongo.close()
})

// Catcher for possible errors leading to promise being rejected; to prevent future crashes.
process.on('unhandledRejection', err => { console.log(err) })

module.exports = {
  app,
  server
}