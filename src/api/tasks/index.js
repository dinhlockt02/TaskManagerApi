const router = require('express').Router();

const taskController = require('./tasks.controller');

router.get('/', taskController.getTasks);
router.post('/', taskController.createTask);
router.get('/:id', taskController.getTask);
router.patch('/:id', taskController.editTask);
router.delete('/:id', taskController.deleteTask);

module.exports = router;
