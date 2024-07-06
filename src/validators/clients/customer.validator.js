import { check } from "express-validator";
import { validatorResults } from "../../handlers/validationHandler.js";

const clientValidator = [
    check("name").isString().notEmpty().withMessage('El nombre es requerido y debe ser una cadena'),
    check("last_name").isString().notEmpty().withMessage('El apellido es requerido y debe ser una cadena'),
    check("pago").isNumeric().notEmpty().withMessage('El pago es requerido y debe ser un número'),
    check("date_pay").optional().isDate().notEmpty().withMessage('La fecha de pago es requerida y debe ser una fecha válida'),
    check("last_pay").optional().isDate().notEmpty().withMessage('La última fecha de pago es requerida y debe ser una fecha válida'),
    check("client_status")
        .optional()
        .isIn(["Pago", "Sin Pagar", "Pendiente", "Sin Agregar"])
        .withMessage('El estado del cliente no es válido'),
    (req, res, next) => {
        return validatorResults(req, res, next);
    }
];

export { clientValidator }