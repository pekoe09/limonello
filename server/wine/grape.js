const mongoose = require('mongoose')
const metaDataSchema = require('../utils/metaData')

const grapeSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true
  },
  description: {
    type: String
  },
  wines: {
    type: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Wine',
      required: true
    }],
    required: true
  },
  metaData: metaDataSchema
})

const Grape = mongoose.model('Grape', grapeSchema)

module.exports = Grape