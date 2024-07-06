const express = require('express')
const {createTask, getAllTasksOfUser, getTaskById, deleteTaskById, updateTask, getTasksByCategory, getTasksByStatus} = require('../controllers/task.controller')
const authenticate = require('../middlewares/auth.middleware')

const router = express.Router()

// create new task
router.post('/create-new', authenticate, createTask)

// get all tasks of user
router.get('/all', authenticate, getAllTasksOfUser)

// get task by task_id
router.get('/:userTaskId', authenticate, getTaskById)

// get task by category
router.post('/category', authenticate, getTasksByCategory)

// get task by status
router.post('/status', authenticate, getTasksByStatus)

// delete task by task_id
router.delete('/:userTaskId', authenticate, deleteTaskById)

// update task by task_id
router.put('/update', authenticate, updateTask)


module.exports = router