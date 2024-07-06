// Ejemplo simplificado del middleware checkRoles
import { HttpCode } from "../helpers/HttpHelper.js";

const checkRoles = (roles = []) => {
    return (req, res, next) => {
        // Verificar si el usuario está autenticado
        console.log('Usuario autenticado:', req.isAuthenticated());

        if (!req.isAuthenticated()) {
            return res.status(HttpCode.UNAUTHORIZED).json({ success: false, message: 'Not authenticated.', redirectUrl: "/login" });
        }

        // Verificar si el usuario tiene uno de los roles necesarios
        console.log('Rol del usuario:', req.user.role);
        if (!roles.includes(req.user.role)) {
            return res.status(HttpCode.UNAUTHORIZED).json({ success: false, message: 'Not authorized.' });
        }

        // Si pasa la validación, continuar con la siguiente función middleware
        next();
    };
};

export { checkRoles };

