import rateLimit from "express-rate-limit"

const limiter = rateLimit({
    windowMs: 10 * 60 * 1000, // 15 minutes
    max: 10, // limit each IP to 100 requests per windowMs
    message: "Demasiadas solicitudes, Intenta mas tarde."
})

export { limiter }