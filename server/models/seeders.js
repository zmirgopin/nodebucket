const mongoose = require('mongoose');
const Employee = require('./employee');
const Task = require('./task');

require('./../connnection')
// Seed 7 employees
async function seedDatabase() {
  await Employee.deleteMany({}).catch((error) => console.log(error));
  await Task.deleteMany({}).catch((error) => console.log(error));


  for (let i = 0; i <= 5; i++) {
    const employee = new Employee({
      name: `Employee ${i + 1}`,
      employeeId: 1007 + i
    });

    await employee.save();

    for (let j = 1; j <= 5; j++) {
      const task = new Task({
        description: `Task ${j} for Employee ${i}`,
        employee: employee._id,
      });

      await task.save();

      employee.tasks.push(task);
      await employee.save();
    }
  }

  mongoose.connection.close();
}

seedDatabase();