import { Router } from "express"

const indexRoute = Router()

/* Routes
* Todas las rutas van acá
*/
import { userRouter } from "./user.router.js"

indexRoute.use("/user", userRouter)

export { indexRoute }