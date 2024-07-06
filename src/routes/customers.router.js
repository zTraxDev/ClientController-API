import { Router } from "express";

const customerRouter = Router()

/**
 * Another Routes and Imports
 */
import { ClientController } from "../controllers/customers.controller.js";
import { clientValidator } from "../validators/clients/customer.validator.js";

customerRouter.post("/create-customer", clientValidator, ClientController.createClient)
customerRouter.get("/:id", ClientController.getClientById)

customerRouter.get("/",  ClientController.getAllClients)
export { customerRouter }