const fs = require("fs");
require("colors");

// Years and paths to the data files
const data = require("./lib/data");

// Parsers
const parser1 = require("./lib/parser1"); // 2003 - 2006
const parser2 = require("./lib/parser2"); // 2007, 2009 - 2019
const parser3 = require("./lib/parser3"); // 2008

// Assign years to a specific parser
const assignParsers = {
  parser1: {
    parser: parser1,
    files: ["2003", "2004", "2005", "2006"],
  },
  parser2: {
    parser: parser2,
    files: [
      "2007",
      "2009",
      "2010",
      "2011",
      "2012",
      "2013",
      "2014",
      "2015",
      "2016",
      "2017",
      "2018",
      "2019",
    ],
  },
  parser3: {
    parser: parser3,
    files: ["2008"],
  },
};

// Verbose logging bool
let verbose = false;

/**
 * Converts Boilermaker results from preformatted text to JSON
 * @param {Boolean} log - Logging true or false. Default is false
 * @returns {Object} - Returns an object of results. Keys = years, values = Array of result objects
 */
function convert(log) {
  if (typeof log === "boolean") {
    verbose = log;
  }
  return new Promise((resolve, reject) => {
    const returnObj = {};
    // Loop parsers
    for (let parser in assignParsers) {
      // Loop files that are used with a particular parser
      assignParsers[parser].files.forEach((year) => {
        // File Exists in the data object
        if (data[year]) {
          const results = fs.readFileSync(data[year]).toString().split("\n");
          returnObj[year] = parse(assignParsers[parser].parser, year, results);
          if (verbose === true) {
            console.log(`${year}: Finished parsing`.green);
          }
        }
      });
    }
    return resolve(returnObj);
  });
}

/**
 *
 * @param {Function} parser - Parser module to use for the given year
 * @param {String} year - Year to parse
 * @param {Array} results - Results to parse
 * @returns {Array} - Returns an array of result objects
 */
function parse(parser, year, results) {
  const resArr = [];
  results.forEach((strResult, index) => {
    const { result: jsonResult, isValid, errors } = parser(year, strResult);
    resArr.push(jsonResult);
    if (!isValid && verbose === true) {
      errors.forEach((err) => {
        console.log(err.red);
      });
    }

    // Log for every thousand parsed
    if (index % 1000 === 0 && verbose === true) {
      console.log(`${year}: parsed ${index} results.`.yellow);
    }
  });
  return resArr;
}

module.exports = convert;
