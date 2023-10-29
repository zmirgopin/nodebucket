const mongoose = require('mongoose');

const employeeSchema = new mongoose.Schema({
  empId: {
    type: Number,
    required: true,
    min: 1007,
    max: 1012,
  },
  name: String,
  tasks: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Task',
    },
  ],
});

module.exports = mongoose.model('Employee', employeeSchema);
