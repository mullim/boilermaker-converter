/**
 * Class used to validate a result object
 */
class Validate {
  constructor(disable) {
    this.disabled = disable;
  }

  validate(result) {
    const errors = [];
    const logPrepend = `Year ${result.year} - Place ${result.place_overall}`;

    if (!this.disabled.place_overall) {
      if (!this._isPlace(result.place_overall)) {
        errors.push(
          `Missing or invalid place overall founrdin year ${result.year}.`
        );
        return { isValid: false, errors };
      }
    }

    if (!this.disabled.gender) {
      if (!this._isGender(result.gender)) {
        errors.push(`${logPrepend}: Missing or invalid gender.`);
      }
    }

    if (!this.disabled.place_gender) {
      if (!this._isPlace(result.place_gender)) {
        errors.push(`${logPrepend}: Missing or invalid place in gender.`);
      }
    }

    if (!this.disabled.place_in_age_group) {
      if (!this._isPlace(result.place_in_age_group)) {
        errors.push(`${logPrepend}: Missing or invalid place in age group.`);
      }
    }

    if (!this.disabled.age_group) {
      if (!this._isAgeGroup(result.age_group)) {
        errors.push(`${logPrepend}: Missing or invalid age group.`);
      }
    }

    if (!this.disabled.gun_pace) {
      if (!this._isPaceOrTime(result.gun_pace)) {
        errors.push(`${logPrepend}: Missing or invalid gun pace.`);
      }
    }

    if (!this.disabled.gun_time) {
      if (!this._isPaceOrTime(result.gun_time)) {
        errors.push(`${logPrepend}: Missing or invalid gun time.`);
      }
    }

    if (!this.disabled.net_pace) {
      if (!this._isPaceOrTime(result.net_pace)) {
        errors.push(`${logPrepend}: Missing or invalid net pace.`);
      }
    }

    if (!this.disabled.net_time) {
      if (!this._isPaceOrTime(result.net_time)) {
        errors.push(`${logPrepend}: Missing or invalid net time.`);
      }
    }

    if (!this.disabled.first_name) {
      if (!this._isName(result.first_name)) {
        errors.push(`${logPrepend}: Missing or invalid first name.`);
      }
    }

    if (!this.disabled.last_name) {
      if (!this._isName(result.last_name)) {
        errors.push(`${logPrepend}: Missing or invalid last name.`);
      }
    }

    if (!this.disabled.state) {
      if (!this._isState(result.state)) {
        errors.push(`${logPrepend}: Missing or invalid state.`);
      }
    }

    if (!this.disabled.city) {
      if (!this._isCity(result.city)) {
        errors.push(`${logPrepend}: Missing or invalid city.`);
      }
    }

    if (!this.disabled.country) {
      if (!this._isCountry(result.country)) {
        errors.push(`${logPrepend}: Missing or invalid country.`);
      }
    }

    return {
      isValid: errors.length > 0 ? false : true,
      errors,
    };
  }

  _isPlace(place) {
    return typeof place === `number` && place > 0;
  }

  _isGender(gender) {
    return typeof gender === `string` && [`MALE`, `FEMALE`].includes(gender);
  }

  _isAgeGroup(group) {
    // TODO: Check against regexp
    return typeof group === `string` && group.length > 0;
  }

  _isPlaceOverall(place) {
    return typeof place === `number` && place > 0;
  }

  _isPaceOrTime(time) {
    // TODO: Check against regexp
    return typeof time === `string` && time.length > 0;
  }

  _isName(name) {
    return typeof name === `string` && name.length > 0;
  }

  _isCity(city) {
    // TODO: Check with a city list
    return typeof city === `string` && city.length > 0;
  }

  _isState(state) {
    // TODO: Check with a state list
    return typeof state === `string` && state.length > 0;
  }

  _isCountry(country) {
    // TODO: Check with a country list
    return typeof country === `string` && country.length > 0;
  }
}

module.exports = Validate;
