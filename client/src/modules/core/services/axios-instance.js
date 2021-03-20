const axios = require('axios')

module.exports = axios.create({
  transformResponse: [function transformResponse(data, headers) {
    let parsed = JSON.parse(data)
    console.log('parsed', parsed)
    return parsed
  }]
})