import { check } from "express-validator"
import { validatorResults } from "../../handlers/validationHandler.js";

const updateUserValidator = [
    check("username").optional().trim().isString(),
    check("password").optional().isString().trim(),
    check("email").optional().trim().isEmail(),
    (req, res, next) => {
        return validatorResults(req, res, next)
    }
]

export { updateUserValidator}