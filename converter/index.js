const convert = require("./convert");
const fs = require("fs");

convert()
  .then((results) => {
    fs.writeFileSync("./data.json", JSON.stringify(results));
  })
  .catch((err) => {
    console.log(err);
  });
