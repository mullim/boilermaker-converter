const human = require("humanparser");
const Validator = require("./Validator");
require("colors");

// Validator Options
const disable = {
  place_gender: true,
  place_in_age_group: true,
  age_group: true,
  // TODO: Look into a better way to parse city and state
  city: true,
  state: true,
};

const validator = new Validator(disable);

module.exports = (year, data) => {
  const result = { year };
  let split;

  // Split the array by spaces and trim
  const array = data.trim().split(/ +/);

  // The overall place will always be index "0" in the array
  /**
   * The overall place will always be index "0" in the array so we get that
   * and then splice it out of the array
   */
  result.place_overall = parseInt(array[0]);
  array.splice(0, 1);

  /**
   * Net pace and net time will always be the last two elements in the array
   * so we get those and then splice them out of the array
   */
  result.net_pace = array[array.length - 1];
  array.splice(array.length - 1, 1);
  result.net_time = array[array.length - 1];
  array.splice(array.length - 1, 1);

  /**
   * Gun pace and gun time will now be the last two elements in the array
   * after splicing the net times we can get those and the splice them out of the array
   */
  result.gun_pace = array[array.length - 1];
  array.splice(array.length - 1, 1);
  result.gun_time = array[array.length - 1];
  array.splice(array.length - 1, 1);

  /**
   * Other data in the array isn't as obvious which will require difficult parsing to store
   * those elements in the result object
   */
  for (let i = array.length - 1; i >= 0; i--) {
    // The easiest thing to look for in the array will be the gender and age of the runner, so we regex test for that
    if (/[FM][0-9]{1,2}/.test(array[i])) {
      /**
       * We found the index with the gender/age so we need get the name.
       * Becuase the name can include up to 3 indices of the array we will
       * create a nameArray[] that includes each element up until the gender/age
       * and then join them
       * TODO: It might quicker to just append the element to a string? Research this
       */
      const nameArray = [];
      let name;
      for (let x = 0; x < i; x++) {
        nameArray.push(array[x]);
      }

      /**
       * Some people wanted to throw a wrench into
       */
      if (/[A-Z][.]/.test(nameArray[0]) && /[A-Z][.]/.test(nameArray[1])) {
        let name = nameArray.slice(0, 2).join("");
        nameArray.splice(0, 2);
        name += " " + nameArray.join(" ");
        name = human.parseName(name);
        if (name.firstName) result.first_name = name.firstName;
        if (name.middleName) result.middle_name = name.middleName;
        if (name.lastName) result.last_name = name.lastName;
        if (name.suffix) result.suffix = name.suffix;
      } else {
        // let the human parser do its job
        name = nameArray.join(" ");
        name = human.parseName(name);
        if (name.firstName) result.first_name = name.firstName;
        if (name.middleName) result.middle_name = name.middleName;
        if (name.lastName) result.last_name = name.lastName;
        if (name.suffix) result.suffix = name.suffix;
      }

      // we can also get the location now that we have the gender/age
      const locationArray = [];
      for (let y = i + 1; y < array.length; y++) {
        locationArray.push(array[y]);
      }

      // one man in 2004 said fuck this I'm not giving out my location...which is why we need this check
      if (locationArray !== undefined && locationArray.length !== 0) {
        // test to see if the location is a state. If it is, then update location information for the results
        // TODO: Write a script that will determine if a string is a state with precision vs. using a regexp
        if (
          locationArray[locationArray.length - 1].length === 2 &&
          /[A-Z]{1,2}/.test(locationArray[locationArray.length - 1])
        ) {
          result.state = locationArray[locationArray.length - 1];
          locationArray.splice(locationArray.length - 1, 1);
          result.city = locationArray.join(" ");
          result.country = "United States";
        } else {
          // if the location doesn't have a state then default the location to a country
          // TODO: There are some rare cases that this is invalid, some runners set their location
          //       to providence, country for example. In the future I'd like to use a location
          //       services API to fix any incorrect location data that we are storing.
          result.country = locationArray.join(" ");
        }
      }

      // finally lets get the gender
      split = array[i].split("");
      // set the gender
      split[0] === "M" ? (result.gender = "MALE") : (result.gender = "FEMALE");
      // remove first index
      split.shift();
      // join the array
      split = split.join("");
      result.age = split;
      // remove from array
      array.splice(i, 1);
    }
  }

  // Validate Result
  const { isValid, errors } = validator.validate(result);

  return { result, isValid, errors };
};
