const mongoose = require('mongoose')
const Schema = mongoose.Schema

// create runner result schema
const RunnerResultsSchema = new Schema({
  salutation: {
    type: String
  },
  first_name: {
    type: String
  },
  middle_name: {
    type: String
  },
  last_name: {
    type: String
  },
  suffix: {
    type: String
  },
  gender: {
    type: String
  },
  age_group: {
    type: String
  },
  age: {
    type: String
  },
  city: {
    type: String
  },
  state: {
    type: String
  },
  country: {
    type: String
  },
  gun_time: {
    type: String
  },
  gun_pace: {
    type: String
  },
  net_time: {
    type: String
  },
  net_pace: {
    type: String
  },
  place_overall: {
    type: String
  },
  place_gender: {
    type: String
  },
  place_in_age_group: {
    type: String
  }
})

const Year2003 = mongoose.model('2003', RunnerResultsSchema)
const Year2004 = mongoose.model('2004', RunnerResultsSchema)
const Year2005 = mongoose.model('2005', RunnerResultsSchema)
const Year2006 = mongoose.model('2006', RunnerResultsSchema)
const Year2007 = mongoose.model('2007', RunnerResultsSchema)
const Year2008 = mongoose.model('2008', RunnerResultsSchema)
const Year2009 = mongoose.model('2009', RunnerResultsSchema)
const Year2010 = mongoose.model('2010', RunnerResultsSchema)
const Year2011 = mongoose.model('2011', RunnerResultsSchema)
const Year2012 = mongoose.model('2012', RunnerResultsSchema)
const Year2013 = mongoose.model('2013', RunnerResultsSchema)
const Year2014 = mongoose.model('2014', RunnerResultsSchema)
const Year2015 = mongoose.model('2015', RunnerResultsSchema)
const Year2016 = mongoose.model('2016', RunnerResultsSchema)
const Year2017 = mongoose.model('2017', RunnerResultsSchema)
const Year2018 = mongoose.model('2018', RunnerResultsSchema)
const Year2019 = mongoose.model('2019', RunnerResultsSchema)

// get the mongoose model from the schema and export it
module.exports = {
  Year2003,
  Year2005,
  Year2006,
  Year2007,
  Year2004,
  Year2008,
  Year2009,
  Year2010,
  Year2011,
  Year2012,
  Year2013,
  Year2014,
  Year2015,
  Year2016,
  Year2017,
  Year2018,
  Year2019
}
