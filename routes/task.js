import { Router } from "express"
import { createTask, getAllTasks, updateTask, successTask } from "../controllers/tasks.js"
import { checkAuth } from "../utils/chechAuth.js"


const router = new Router()

//create task
router.post('/', createTask)

//get all tasks
router.put('/', getAllTasks)

//update task
router.put('/:id', checkAuth, updateTask)

//success
router.get('/:id', checkAuth, successTask)

export default router