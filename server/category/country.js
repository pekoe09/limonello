import mongoose from 'mongoose'
import metaDataSchema from '../utils/metaData'

const countrySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  continent: {
    type: String,
    required: true
  },
  metaData: metaDataSchema
})

const Country = mongoose.model('Country', countrySchema)

module.exports = Country