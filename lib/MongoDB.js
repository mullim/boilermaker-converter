const mongoose = require('mongoose')
require('colors')

/**
 * @module MongoDB - Connects to MongoDB
 * @param {object} mongoURI - Uniform Resource Identifier to c
 */
module.exports = function (options) {
  return new Promise((resolve, reject) => {
    // Type checking
    if (typeof options !== 'object') {
      return reject(new Error('options argument must be of type object'))
    }

    // Set Mongo Options
    const mongoOptions = {
      username: options.username || null,
      password: options.password || null,
      host: options.host || null,
      port: options.port || null,
      database: options.database || null
    }

    // Validate minimum requirements
    if (!mongoOptions.host || !mongoOptions.port || !mongoOptions.database) {
      return reject(new Error('options object is missing required keys'))
    }

    // Create a mongo URI
    const mongoURI = setURI(mongoOptions)

    mongoose
      .connect(mongoURI)
      .then(() => {
        console.log('MongoDB Connected'.green)
        return resolve()
      })
      .catch(err => {
        // TODO: Better error handling
        if (err) {
          console.error('Error: ' + err)
          return reject(err)
        } else {
          return reject(new Error('Error connecting to MongoDB'))
        }
      })
  })
}

/**
 * Creates a MongoDB URI to connect to the database
 * @param {object} options - options object which contains database data
 */
function setURI (options) {
  let str = 'mongodb://'

  if (options.username && options.password) {
    str += options.username + ':' + options.password + '@'
  }

  str += options.host + ':' + options.port + '/' + options.database

  return str
}
