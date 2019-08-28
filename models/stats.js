const mongoose = require('mongoose')
const Schema = mongoose.Schema

// create statistics schema
const StatsSchema = new Schema({
  runners_total: {
    type: String
  },
  men_total: {
    type: String
  },
  women_total: {
    type: String
  },
  age_group_total: {
    type: String
  },
  average_total_time: {
    type: String
  },
  average_pace_time: {
    type: String
  },
  average_age_group: {
    type: String
  },
  most_common_location: {
    type: String
  }
})

// get the mongoose model from the schema and export it
module.exports = mongoose.model('statistics', StatsSchema)
