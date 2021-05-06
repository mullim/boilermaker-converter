const human = require("humanparser");
const Validator = require("./Validator");
require("colors");

// Validator Options
const disable = {};

const validator = new Validator(disable);

module.exports = (year, data) => {
  const result = { year };

  // split the array by spaces and trim
  const array = data.trim().split(/ +/);

  // set the overall place and remove from array
  result.place_overall = parseInt(array[0]);
  array.splice(0, 1);

  // find other data in the array
  for (let i = array.length - 1; i >= 0; i--) {
    if (/[FM][#]{1,2}/.test(array[i])) {
      // we found the position of the gender so we need to
      // get the name. Because the name can be up to 3 indices of
      // the array we will take them all up to the gender/age and
      // join them then remove them from the array
      const nameArray = [];
      let name;

      // get the gender
      array[i].split("#")[0] === "M"
        ? (result.gender = "MALE")
        : (result.gender = "FEMALE");

      if (/^\d+$/.test(array[i].split("#")[1])) {
        result.place_gender = parseInt(array[i].split("#")[1]);
      }

      for (let x = 0; x < i; x++) {
        nameArray.push(array[x]);
      }

      name = nameArray.join(" ");
      name = human.parseName(name);
      if (name.salutation) {
        if (name.salutation.includes("Hon")) {
          // human parser didn't accurately parse Hon has a first name
          result.first_name = name.salutation;
        } else {
          result.salutation = name.salutation;
        }
      }
      if (name.firstName) result.first_name = name.firstName;
      if (name.middleName) result.middle_name = name.middleName;
      if (name.lastName) result.last_name = name.lastName;
      if (name.suffix) result.suffix = name.suffix;

      let indexShift;
      if (result.place_gender === undefined) {
        indexShift = i + 1;
        result.place_gender = parseInt(array[indexShift]);
      } else {
        indexShift = i;
      }
      result.place_in_age_group = parseInt(array[indexShift + 1].split("/")[0]);
      result.age_group = array[indexShift + 2].substring(1);

      // set result time
      result.gun_time = array[indexShift + 3];
      result.gun_pace = array[indexShift + 4];
      result.net_time = array[indexShift + 5];
      result.net_pace = array[indexShift + 6];

      // set locatiom
      const locationArray = [];
      let locationIndex = indexShift + 7;

      for (locationIndex; locationIndex < array.length; locationIndex++) {
        locationArray.push(array[locationIndex]);
      }

      if (locationArray !== undefined && locationArray.length !== 0) {
        // test to see if the location is a state. If it is, then update location information for the results
        if (
          locationArray[locationArray.length - 1].length === 2 &&
          /[A-Z]{1,2}/.test(locationArray[locationArray.length - 1])
        ) {
          result.state = locationArray[locationArray.length - 1];
          locationArray.splice(locationArray.length - 1, 1);
          result.city = locationArray.join(" ");
          result.country = "United States";
        } else {
          result.country = locationArray.join(" ");
        }
      }
    }
  }

  // Validate Result
  const { isValid, errors } = validator.validate(result);

  return { result, isValid, errors };
};
