import express from 'express'

import { todoController} from '../controllers/todoController.js'

const router = express.Router()

router.delete('/:id',todoController.deleteTodo)

router.put('/:id',todoController.updateByIdUser)
router.post('/',todoController.createTodo)

router.get('/',todoController.getOneTodo)
router.get('/:id_user',todoController.getAllTodoById)

export default router