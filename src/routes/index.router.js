import { Router } from "express"

const indexRoute = Router()

/* Routes
* Todas las rutas van acá
*/
import { userRouter } from "./user.router.js"
import { customerRouter } from "./customers.router.js"

indexRoute.use("/user", userRouter)
indexRoute.use("/customers", customerRouter)

export { indexRoute }