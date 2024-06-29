import { Router } from "express"
import { UserService } from "../services/user.services.js"
import { userValidator } from "../validators/userValidator.js"

const userRouter = Router()

// Gets
userRouter.get("/", UserService.getAllUser)
userRouter.get("/:username", UserService.getUserByUsername)
userRouter.get("/:id", UserService.getUserById)

// Posts and Patch
userRouter.post("/create", userValidator, UserService.createUser)

export { userRouter }