import mongoose from 'mongoose'
import metaDataSchema from '../utils/metaData'

const regionSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  country: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Country',
    required: true
  },
  metaData: metaDataSchema
})

const Region = mongoose.model('Area', regionSchema)

module.exports = Region