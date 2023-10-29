/**
 * Title: app.js
 * Author: zahava Gopin
 * Date: 10/29/2023
 */
'use strict'

// Require statements
const express = require('express')
const createServer = require('http-errors')
const path = require('path')
require('./connnection')
const Employee = require('./models/employee')

// Create the Express app
const app = express()

const cors = require('cors')
app.use(cors())


// Configure the app

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(express.static(path.join(__dirname, '../dist/nodebucket')))
app.use('/', express.static(path.join(__dirname, '../dist/nodebucket')))

app.get('/hello', (req, res) => res.send('world'))

// Define your API endpoints
app.get('/api/employees/:empId', cors(), async (req, res) => {
  // Implement logic to find an employee by empId and send the response.

  // get the empId from req.params
  const empId = req.params.empId

  //make a find query and provid an object { empId: someValue } that will be used to filter the rows
  const [emp] = await Employee.find({ empId })

  // console.log({ emp }) //log the response to the console for debugging
  return res.json(emp) // return the response as a json
});


// // error handler for 404 errors
// app.use(function (req, res, next) {
//   next(createServer(404)) // forward to error handler
// })

// // error handler for all other errors
// app.use(function (err, req, res, next) {
//   res.status(err.status || 500) // set response status code4

//   // send response to client in JSON format with a message and stack trace
//   res.json({
//     type: 'error',
//     status: err.status,
//     message: err.message,
//     stack: req.app.get('env') === 'development' ? err.stack : undefined
//   })
// })


module.exports = app // export the Express application