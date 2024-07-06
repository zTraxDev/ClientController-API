import { Router } from "express"
import { UserController } from "../controllers/user.controller.js"
import { userValidator } from "../validators/user/userValidator.js"
import { loginValidator } from "../validators/user/login.validator.js"
import { updateUserValidator } from "../validators/user/updateUser.validator.js"
import { checkRoles } from "../middleware/role.middleware.js"
import { limiter } from "../middleware/requestLimiter.middleware.js"

const userRouter = Router()


/**
 * Middlewares
 */

// userRouter.use(limiter)

userRouter.post("/login", loginValidator, UserController.logginUser);
userRouter.post("/create", checkRoles(['manager', 'admin']), userValidator, UserController.registerUser);
userRouter.patch("/edit/:id", checkRoles(['manager','admin']), updateUserValidator, UserController.updateUserById)

userRouter.get("/:id", checkRoles(['manager', 'admin']), UserController.getUserById);
userRouter.get("/username/:username", checkRoles(['manager', 'admin']),UserController.getUserByUsername);


userRouter.get("/", checkRoles(['manager', 'admin']), UserController.getAllUser);


userRouter.delete("/:id", checkRoles(['manager', 'admin']), UserController.deleteUserById);

export { userRouter };