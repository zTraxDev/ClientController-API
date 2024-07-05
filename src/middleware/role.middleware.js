import { HttpCode } from "../helpers/HttpHelper.js"

const checkRoles = (roles = []) => {
    try {
        return (req, res, next) => {
            const userRole = req.user.role;
    
            // Verificar si el rol del usuario incluye alguno de los roles permitidos
            if (!userRole || !roles.some(role => userRole.includes(role))) {
                return res.status(HttpCode.UNAUTHORIZED).json({
                    success: false,
                    message: "No autorizado para acceder a esta función.",
                    status_code: HttpCode.UNAUTHORIZED
                });
            }
    
            // Continuar con la siguiente función de middleware
            next();
        };
    } catch (error) {
        console.log(error)
    }
}



export { checkRoles }