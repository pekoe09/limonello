const mongoose = require('mongoose')

const userRightSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  rightLevel: {
    type: String,
    required: true
  }
})

const UserRight = mongoose.model('UserRight', userRightSchema)

module.exports = UserRight