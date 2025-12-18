import express from "express"
import userController from "../controllers/user.controller";
const userRouter = express.Router()

userRouter.get('/', userController.getAll)
userRouter.get('/:id', userController.getOne)
userRouter.post('/', userController.create)
userRouter.post('/login', userController.login)
userRouter.put('/', userController.update)
userRouter.delete('/', userController.delete)

export default userRouter;