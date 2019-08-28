const human = require('humanparser')
const insertResult = require('../lib/insertResult')

module.exports = (year, data, next) => {
  const result = {}
  let split

  // split the array by spaces and trim
  const array = data.trim().split(/ +/)

  // set the overall place and remove from array
  result.place_overall = array[0]
  array.splice(0, 1)

  // set the net pace and net time and remove their indices
  result.net_pace = array[array.length - 1]
  array.splice(array.length - 1, 1)
  result.net_time = array[array.length - 1]
  array.splice(array.length - 1, 1)

  // set the gun pace and gun time and remove their indices
  result.gun_pace = array[array.length - 1]
  array.splice(array.length - 1, 1)
  result.gun_time = array[array.length - 1]
  array.splice(array.length - 1, 1)

  // find other data in the array
  for (let i = array.length - 1; i >= 0; i--) {
    if (/[FM][0-9]{1,2}/.test(array[i])) {
      // we found the position of the gender/age so we need to
      // get the name. Because the name can be up to 3 indices of
      // the array we will take them all up to the gender/age and
      // join them then remove them from the array
      const nameArray = []
      let name
      for (let x = 0; x < i; x++) {
        nameArray.push(array[x])
      }
      // Rare case of abbrv name
      if (/[A-Z][.]/.test(nameArray[0]) && /[A-Z][.]/.test(nameArray[1])) {
        let name = nameArray.slice(0, 2).join('')
        nameArray.splice(0, 2)
        name += ' ' + nameArray.join(' ')
        name = human.parseName(name)
        if (name.firstName) result.first_name = name.firstName
        if (name.middleName) result.middle_name = name.middleName
        if (name.lastName) result.last_name = name.lastName
        if (name.suffix) result.suffix = name.suffix
      } else {
        // let the human parser do its job
        name = nameArray.join(' ')
        name = human.parseName(name)
        if (name.firstName) result.first_name = name.firstName
        if (name.middleName) result.middle_name = name.middleName
        if (name.lastName) result.last_name = name.lastName
        if (name.suffix) result.suffix = name.suffix
      }

      // we can also get the location now that we have the gender/age
      const locationArray = []
      for (let y = i + 1; y < array.length; y++) {
        locationArray.push(array[y])
      }

      // one man in 2004 said fuck this I'm not giving out my location...which is why we need this check
      if (locationArray !== undefined && locationArray.length !== 0) {
        // test to see if the location is a state. If it is, then update location information for the results
        // TODO: Write a script that will determine if a string is a state with precision vs. using a regexp
        if (locationArray[locationArray.length - 1].length === 2 && /[A-Z]{1,2}/.test(locationArray[locationArray.length - 1])) {
          result.state = locationArray[locationArray.length - 1]
          locationArray.splice(locationArray.length - 1, 1)
          result.city = locationArray.join(' ')
          result.country = 'United States'
        } else {
          // if the location doesn't have a state then default the location to a country
          // TODO: There are some rare cases that this is invalid, some runners set their location
          //       to providence, country for example. In the future I'd like to use a location
          //       services API to fix any incorrect location data that we are storing.
          result.country = locationArray.join(' ')
        }
      }

      // finally lets get the gender
      split = array[i].split('')
      // set the gender
      split[0] === 'M' ? result.gender = 'MALE' : result.gender = 'FEMALE'
      // remove first index
      split.shift()
      // join the array
      split = split.join('')
      result.age = split
      // remove from array
      array.splice(i, 1)
    }
  }
  if (!result.place_overall) console.log('Missing place overall')
  if (!result.gender) console.log('Missing gender')
  if (!result.gun_pace) console.log('Missing gun pace')
  if (!result.gun_time) console.log('Missing gun time')
  if (!result.net_pace) console.log('Missing gun pace')
  if (!result.net_time) console.log('Missing gun time')
  if (!result.first_name) console.log('Missing first name')
  if (!result.last_name) console.log('Missing last name')
  if (!result.country) console.log('Missing Country')
  insertResult(year, result, next)
}
