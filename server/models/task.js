/**
 * Title: task.js
 * Author: Zahava Gopin
 * Date: 10/28/23
 * Description: tasks model
 */
const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
  description: String,
  employee: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Employee',
  },
});

module.exports = mongoose.model('Task', taskSchema);
