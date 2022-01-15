const { ObjectId } = require('mongoose').Types;
const validator = require('validator');
const Task = require('../../../models/task');

module.exports = {
  CheckValidateTaskInput: async (name) => {
    if (!validator.isLength(name, { min: 5, max: 20 })) {
      const err = new Error(
        'Name of the tasks must be between 5 and 20 character length'
      );
      err.statusCode = 400;
      throw err;
    }
  },
  findTask: async (id) => {
    if (!ObjectId.isValid(id)) {
      const err = new Error('Task not found');
      err.statusCode = 404;
      throw err;
    }
    const task = await Task.findById(id);
    if (!task) {
      const err = new Error('Task not found');
      err.statusCode = 404;
      throw err;
    }
    return task;
  },
};
