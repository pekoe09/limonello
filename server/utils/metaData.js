const mongoose = require('mongoose')

const timestampSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: false
  },
  time: {
    type: Date,
    required: false
  }
})

const metaDataSchema = new mongoose.Schema({
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  created: {
    type: timestampSchema,
    required: true
  },
  edited: {
    type: timestampSchema,
    required: false
  }
})

module.exports = metaDataSchema