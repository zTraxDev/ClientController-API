import { User } from "../database/models/userModel.js";

const verifyEmail = async (email) => {
    try {
        const user = await User.findOne({ email: email });
        return user !== null; // Retorna true si se encuentra un usuario con ese email, false si no
    } catch (error) {
        console.error('Error al verificar el email:', error);
        throw error; // Lanza el error para que pueda ser manejado por el llamador
    }
};


export { verifyEmail }