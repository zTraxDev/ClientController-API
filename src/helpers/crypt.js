import bcrypt from "bcrypt";

const saltRounds = 10;

const hashPassword = async (password) => {
    try {
        const hashed = await bcrypt.hash(password, saltRounds);
        return hashed;
    } catch (e) {
        console.error("Error hashing password:", e);
        throw e; // Re-lanza el error para manejarlo en el contexto donde se llama hashPassword
    }
};

const comparePassword = async (password, hash) => {
    try {
        const match = await bcrypt.compare(password, hash);
        return match;
    } catch (e) {
        console.error("Error comparando contraseñas:", e);
        throw e; // Re-lanza el error para manejarlo en el contexto donde se llama comparePassword
    }
};

export { 
    hashPassword,
    comparePassword
};
