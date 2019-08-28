const db = require('./config/keys').mongoURI
const fs = require('fs')
const klaw = require('klaw-sync')
const mongoose = require('mongoose')
const path = require('path')
require('colors')

// parsers
const parser1 = require('./parsers/parser1') // 2003 - 2006
const parser2 = require('./parsers/parser2') // 2007, 2009 - 2019
const parser3 = require('./parsers/parser3') // 2008

// assign years to a parser
const assignParsers = {
  parser1: {
    parser: parser1,
    files: ['2003', '2004', '2005', '2006']
  },
  parser2: {
    parser: parser2,
    files: ['2007', '2009', '2010', '2011', '2012', '2013', '2014', '2015', '2016', '2017', '2018', '2019']
  },
  parser3: {
    parser: parser3,
    files: ['2008']
  }
}

// get data files
// directories for the data files and the parsers
const dataFiles = klaw(path.join(__dirname, './data'), { nodir: true })
let remainingDataFiles = dataFiles.length
let results
let year

// Start mongoose connection
mongoose
  .connect(db, { useNewUrlParser: true })
  .then(() => {
    console.log('MongoDB Connected'.green)
    console.log('Parsing/Inserting Results'.underline.bold.red)

    // iterate through data .txt files
    dataFiles.forEach((file) => {
      for (const key in assignParsers) {
        for (let x = 0; x < assignParsers[key].files.length; x++) {
          year = 'Year' + assignParsers[key].files[x]
          if (file.path.includes(assignParsers[key].files[x])) {
            results = fs.readFileSync(file.path).toString().split('\n')
            parse(assignParsers[key].parser, year, results, 0, () => {
              handleRemaining(file.path)
            })
          }
        }
      }
    })
  })
  .catch(err => console.error(err))

function handleRemaining (file) {
  // get the file name alone as a string
  file = file.split('/')
  file = file[file.length - 1]
  file = file.replace(/\.[^/.]+$/, '')
  console.log(`Finished parsing/inserting year ${file} into the database.`.green)
  remainingDataFiles--
  if (remainingDataFiles === 0) {
    console.log('Finished'.red.bold)
    process.exit(0)
  }
}

function parse (parser, year, results, index, next) {
  parser(year, results[index], () => {
    index++
    if (index % 1000 === 0) {
      console.log(year + ': inserted ' + index + ' results.')
    }
    if (index === results.length) {
      next()
    } else {
      parse(parser, year, results, index, next)
    }
  })
}
