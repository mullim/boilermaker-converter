const mongoose = require('mongoose')

const db = require('../config/keys').mongoURI

mongoose
  .connect(db, { useNewUrlParser: true })
  .then(() => {
    console.log('MongoDB Connected')
    // List of all collections
    mongoose.connection.db.listCollections().toArray((listError, collections) => {
      if (listError) {
        console.error(listError)
      } else {
        if (collections.length === 0) {
          console.log('Databse is empty')
          mongoose.disconnect()
        } else {
          collections.forEach((collection, index) => {
            mongoose.connection.dropCollection(collection.name, (dropError, result) => {
              if (dropError) {
                console.error(dropError)
              }
              if (result) {
                console.log(`Dropped Collection: ${collection.name}`)
                if (index === collections.length - 1) {
                  console.log('Database is empty')
                  mongoose.disconnect()
                }
              }
            })
          })
        }
      }
    })
  })
  .catch(err => console.error('Error: ' + err))
