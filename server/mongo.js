const mongoose = require('mongoose')
const config = require('./config.js')
const bcrypt = require('bcryptjs')
const { User } = require('./user')
const { UserRight } = require('./user')

const initializeUser = async () => {
  const users = await User.find({})
  if (!users || users.length === 0) {
    console.log('Initializing first user')
    const saltRounds = 10
    const passwordHash = await bcrypt.hash(config.firstPassword, saltRounds)
    let user = new User({
      username: config.firstUsername,
      passwordHash,
      firstNames: 'Default',
      lastName: 'Admin',
      email: 'some.one@some.where',
      userRights: []
    })
    user = await user.save()

    let userRight = new UserRight({
      user: user._id,
      rightLevel: 'superadmin'
    })
    userRight = await userRight.save()
    user = await User.findByIdAndUpdate(
      user._id,
      { $push: { userRights: userRight._id } },
      { new: true }
    )
  }
}

if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}
console.log('Environment', process.env.NODE_ENV)
console.log('Connection string', config.dbConnStr)
console.log('Connecting to database...')
mongoose.set('useNewUrlParser', true)
mongoose.set('useFindAndModify', false)
mongoose.set('useCreateIndex', true)
mongoose.set('useUnifiedTopology', true)
console.log('connstr:', config.dbConnStr)
mongoose.connect(config.dbConnStr, { useNewUrlParser: true })
mongoose.Promise = global.Promise
console.log('...connected!')

// if there are no users (db is pristine), first admin user is initialized
initializeUser()

close = () => {
  mongoose.connection.close()
  console.log('Database connection closed')
}

module.exports = { close }