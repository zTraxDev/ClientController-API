import { validationResult, check } from "express-validator";
import { validatorResults } from "../handlers/validationHandler.js";

const userValidator = [
    check('username').isString().notEmpty().isLength({ max: 32}),
    check('email').isEmail().notEmpty().toLowerCase().isLength({ max: 50}).withMessage("El Correo es demasiado largo"),
    check('password').isLength({ min: 6 }).notEmpty(),
    ((req, res, next) => {
        return validatorResults(req, res, next)
    })
]

export { userValidator }