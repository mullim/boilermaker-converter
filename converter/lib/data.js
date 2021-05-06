const fs = require("fs");
const path = require("path");

const dataDir = path.join(__dirname, "../data/");
const files = fs.readdirSync(dataDir);

const dataObj = {};
files.forEach((file) => {
  dataObj[file.slice(0, -4)] = path.join(__dirname, "../data/", file);
});

/**
 * Exports an object whose keys are the years and the
 * values are the path to the data file
 */
module.exports = dataObj;
