const Task = require('../../../models/task');
const taskService = require('./tasks.service');

module.exports = {
  createTask: async (req, res, next) => {
    try {
      const { name } = req.body;
      await taskService.CheckValidateTaskInput(name);
      const task = new Task({ name });
      await task.save();
      res.status(201).json({ message: 'Create task successfully' });
    } catch (err) {
      next(err);
    }
  },
  getTasks: async (req, res, next) => {
    try {
      const tasks = await Task.find();
      res.status(200).json({ tasks, message: 'Successful' });
    } catch (err) {
      next(err);
    }
  },
  getTask: async (req, res, next) => {
    try {
      const { id } = req.params;
      const task = await taskService.findTask(id);
      res.status(200).json({ task, message: 'Successful' });
    } catch (err) {
      next(err);
    }
  },
  editTask: async (req, res, next) => {
    try {
      const { id } = req.params;
      const task = await taskService.findTask(id);
      const { name, completed } = req.body;
      await taskService.CheckValidateTaskInput(name);
      task.name = name;
      task.completed = completed;
      await task.save();
      res.status(200).json({ task, message: 'Successful' });
    } catch (err) {
      next(err);
    }
  },
  deleteTask: async (req, res, next) => {
    try {
      const { id } = req.params;
      await taskService.findTask(id);
      await Task.findByIdAndDelete(id);
      res.status(200).json({ message: 'successful' });
    } catch (err) {
      next(err);
    }
  },
};
