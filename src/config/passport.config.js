import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import { User } from "../database/models/userModel.js";
import { compare } from "bcrypt";
import logger from "../utils/logger.js"; // Asegúrate de que la ruta es correcta

passport.use(new LocalStrategy(
  { usernameField: 'username' },
  async (username, password, done) => {
    try {
      const user = await User.findOne({ username });

      if (!user) {
        logger.error(`Usuario no encontrado: ${username}`);
        return done(null, false, { message: 'Incorrect username or password.' });
      }

      const isValidPass = await compare(password, user.password);

      if (!isValidPass) {
        logger.error(`Contraseña incorrecta para el usuario: ${username}`);
        return done(null, false, { message: 'Incorrect password or password.' });
      }

      return done(null, user, { message: 'Logged In Successfully' });
    } catch (error) {
      logger.error(`Error en la autenticación: ${error.message}`);
      return done(error);
    }
  }
));

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  try {
    const user = await User.findById(id);
    done(null, user);
  } catch (error) {
    logger.error(`Error al deserializar usuario: ${error.message}`);
    done(error);
  }
});

export default passport;
