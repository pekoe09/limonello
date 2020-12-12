if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}

let port = process.env.PORT
let dbConnStr = process.env.DB_CONN_STR
let bucket = process.env.S3_BUCKET
let firstUsername = process.env.FIRST_ADMIN_NAME
let firstPassword = process.env.FIRST_ADMIN_PSW

if (process.env.NODE_ENV === 'test') {
  port = process.env.TEST_PORT
  dbConnStr = process.env.TEST_DB_CONN_STR
  bucket = process.env.TEST_S3_BUCKET
} else if (process.env.NODE_ENV === 'development') {
  dbConnStr = process.env.DEV_DB_CONN_STR
  bucket = process.env.DEV_S3_BUCKET
}

module.exports = {
  port,
  dbConnStr,
  bucket,
  firstUsername,
  firstPassword
}