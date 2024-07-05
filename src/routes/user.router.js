import { Router } from "express"
import { UserController } from "../controllers/user.controller.js"
import { userValidator } from "../validators/userValidator.js"
import { loginValidator } from "../validators/login.validator.js"
import { checkRoles } from "../middleware/role.middleware.js"

const userRouter = Router()

// Gets
userRouter.get("/", UserController.getAllUser)
userRouter.get("/:username", UserController.getUserByUsername)
userRouter.get("/:id", UserController.getUserById)

// Posts and Patch
userRouter.post("/create", userValidator, UserController.createUser)
userRouter.post("/login", loginValidator, UserController.logginUser)


// Delte
userRouter.delete("/:id", UserController.deleteUserById)

export { userRouter }