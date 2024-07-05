import { Router } from "express";

const customerRouter = Router()

/**
 * Another Routes and Imports
 */
import { ClientController } from "../controllers/customers.controller.js";

customerRouter.get("/", ClientController.getAllClients)
export { customerRouter }