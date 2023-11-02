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
const task = require('./models/task')
const employee = require('./models/employee')
app.use(cors())


// Configure the app

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(express.static(path.join(__dirname, '../dist/nodebucket')))
app.use('/', express.static(path.join(__dirname, '../dist/nodebucket')))

// allow other host like google.com to ask for data from our host(localhost:300)
app.use(cors())


app.get('/hello', (req, res) => res.send('world'))

// Define your API endpoints
app.get('/api/employees/:empId', async (req, res) => {
  // Implement logic to find an employee by empId and send the response.

  // get the empId from req.params
  const empId = req.params.empId

  //make a find query and provid an object { empId: someValue } that will be used to filter the rows
  const [emp] = await Employee.find({ empId })

  // console.log({ emp }) //log the response to the console for debugging
  return res.json(emp) // return the response as a json
});


app.get('/api/employees/:empId/tasks', async (req, res) => {
  const _employee = await employee.findOne({ empId: req.params.empId })

  // return an empty array if no employee exists
  if (!_employee) {
    return res.json('not found')
  }
  // find the tasks which belong to an employee whose empId matches the empId in the request url
  const tasks = await task.find({ 'employee': _employee.id });

  return res.json(tasks);
})

app.post('/api/employees/:empId/tasks', async (req, res) => {
  // create and return the created task

  const [emp] = await employee.find({ empId: req.params.empId })
  if (!emp) {
    return res.send(429, { emp })
  }
  let { task: newTask } = req.body

  newTask = { ...newTask, employee: emp._id }
  console.log({ newTask, emp })
  return res.json(await task.create(newTask))

})


app.put('/api/employees/:empId/tasks/:taskId', async (req, res) => {
  // create and return the created task

  const _task = req.body.task

  console.log({ _task })
  return res.json(await task.updateOne({ _id: req.params.taskId }, _task))

})


app.delete('/api/employees/:empId/tasks/:taskId', async (req, res) => {
  // create and return the created task

  return res.json(await task.deleteOne({ _id: req.params.taskId }))

})


// // error handler for 404 errors
app.use(function (req, res, next) {
  next(createServer(404)) // forward to error handler
})

// error handler for all other errors
app.use(function (err, req, res, next) {
  res.status(err.status || 500) // set response status code4

  // send response to client in JSON format with a message and stack trace
  res.json({
    type: 'error',
    status: err.status,
    message: err.message,
    stack: req.app.get('env') === 'development' ? err.stack : undefined
  })
})


module.exports = app // export the Express application