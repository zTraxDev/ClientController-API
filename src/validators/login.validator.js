import { validationResult, check } from "express-validator";
import { validatorResults } from "../handlers/validationHandler.js";

const loginValidator = [
    check('username').isString().notEmpty(),
    check('password').notEmpty(),
    ((req, res, next) => {
        return validatorResults(req, res, next)
    })
]

export { loginValidator }