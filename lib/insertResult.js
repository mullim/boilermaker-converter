const RunnerResult = require('../models/runnerResult')

module.exports = function (year, result, next) {
  let newRunner
  const dataToInsert = {
    salutation: result.salutation,
    first_name: result.first_name,
    middle_name: result.middle_name,
    last_name: result.last_name,
    suffix: result.suffix,
    gender: result.gender,
    age_group: result.age_group,
    age: result.age,
    city: result.city,
    state: result.state,
    country: result.country,
    gun_time: result.gun_time,
    gun_pace: result.gun_pace,
    net_time: result.net_time,
    net_pace: result.net_pace,
    place_overall: result.place_overall,
    place_gender: result.place_gender,
    place_gender_age_group: result.place_gender_age_group
  }

  // select year to save the result to
  switch (year) {
    case 'Year2003':
      newRunner = new RunnerResult.Year2003(dataToInsert)
      break
    case 'Year2004':
      newRunner = new RunnerResult.Year2004(dataToInsert)
      break
    case 'Year2005':
      newRunner = new RunnerResult.Year2005(dataToInsert)
      break
    case 'Year2006':
      newRunner = new RunnerResult.Year2006(dataToInsert)
      break
    case 'Year2007':
      newRunner = new RunnerResult.Year2007(dataToInsert)
      break
    case 'Year2008':
      newRunner = new RunnerResult.Year2008(dataToInsert)
      break
    case 'Year2009':
      newRunner = new RunnerResult.Year2009(dataToInsert)
      break
    case 'Year2010':
      newRunner = new RunnerResult.Year2010(dataToInsert)
      break
    case 'Year2011':
      newRunner = new RunnerResult.Year2011(dataToInsert)
      break
    case 'Year2012':
      newRunner = new RunnerResult.Year2012(dataToInsert)
      break
    case 'Year2013':
      newRunner = new RunnerResult.Year2013(dataToInsert)
      break
    case 'Year2014':
      newRunner = new RunnerResult.Year2014(dataToInsert)
      break
    case 'Year2015':
      newRunner = new RunnerResult.Year2015(dataToInsert)
      break
    case 'Year2016':
      newRunner = new RunnerResult.Year2016(dataToInsert)
      break
    case 'Year2017':
      newRunner = new RunnerResult.Year2017(dataToInsert)
      break
    case 'Year2018':
      newRunner = new RunnerResult.Year2018(dataToInsert)
      break
    case 'Year2019':
      newRunner = new RunnerResult.Year2019(dataToInsert)
      break
  }

  // save the runner result
  newRunner.save()
    .then(() => {
      next()
    })
    .catch((err) => {
      console.log(err)
    })
}
