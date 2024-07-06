import { check } from "express-validator"
import { validatorResults } from "../../handlers/validationHandler.js";

const getClientValidator = [
    check("name").isString().notEmpty().withMessage('Debes de proporcionar el usuario que deseas buscar').trim(),
    (req, res, next) => {
        return validatorResults(req, res, next)
    }
]

export { validatorResults }