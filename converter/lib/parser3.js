const human = require("humanparser");
const Validator = require("./Validator");
require("colors");

// Validator Options
const disable = {
  net_pace: true,
  net_time: true,
};

const validator = new Validator(disable);

module.exports = (year, data) => {
  const result = { year };
  let name;

  // split the array by spaces and trim
  const array = data.trim().split(/ +/);

  result.place_overall = parseInt(array[0]);
  array.splice(0, 1);

  for (let i = array.length - 1; i >= 0; i--) {
    if (/[FM][#]{1,2}/.test(array[i])) {
      // get the gender
      array[i].split("#")[0] === "M"
        ? (result.gender = "MALE")
        : (result.gender = "FEMALE");

      // place in sex
      result.place_gender = parseInt(array[i + 1]);

      // age group
      result.age_group = array[i - 1].substring(1);

      // place in age group
      result.place_in_age_group = parseInt(array[i - 2].split("/")[0]);

      // set gun time and pace
      result.gun_pace = array[i - 3];
      result.gun_time = array[i - 4];

      // age
      result.age = array[i - 5];

      // get name
      const nameArray = [];
      // let name
      for (let x = 0; x < i - 5; x++) {
        nameArray.push(array[x]);
      }

      // let the human parser do its job
      name = nameArray.join(" ");
      name = human.parseName(name);
      if (name.firstName) result.first_name = name.firstName;
      if (name.middleName) result.middle_name = name.middleName;
      if (name.lastName) result.last_name = name.lastName;
      if (name.suffix) result.suffix = name.suffix;

      // set locatiom
      const locationArray = [];
      let locationIndex = i + 2;

      for (locationIndex; locationIndex < array.length; locationIndex++) {
        locationArray.push(array[locationIndex]);
      }

      if (locationArray !== undefined && locationArray.length !== 0) {
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
