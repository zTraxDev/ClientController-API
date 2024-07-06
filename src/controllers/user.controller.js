import mongoose from "mongoose";
import logger from "../utils/logger.js";
import { User } from "../database/models/userModel.js"
import { matchedData } from "express-validator";
import { HttpCode } from "../helpers/HttpHelper.js";
import { verifyEmail } from "../helpers/VerifyEmail.js";
import { hashPassword, comparePassword } from "../helpers/crypt.js";
import passport from "passport";
import bcrypt from "bcrypt"

/**
 * @class UserServices
 * @author zTrax
 */
class UserServices {
    /**
     * 
     * @param {req} req 
     * @param {res} res 
     */
    async getAllUser(req, res) {
        try {
            const users = await User.find().populate('clients')

            if(!users) return res.json({succes: true,  message: "Lista de usuarios vacia", status_code: HttpCode.OK}).status(HttpCode.OK)

            return res.json({ data: users })
            logger.info(`Lista de usuarios obtenidas`)

        } catch (e) {
            logger.info("Hubo un error al obtener la lista de usuarios:" + e)
            return res.json({
                succes: false,
                message: "Error del servidor",
                status_code: HttpCode.INTERNAL_SERVER_ERROR
            })
        }
    }

    /**
     * 
     * @param {req} req 
     * @param {res} res 
     */

    async getUserById(req, res) {
        try {
            const { id } = req.params
            const finduser = await User.findById(id)

            if(!mongoose.Types.ObjectId.isValid(id))
                return res.status(HttpCode.BAD_REQUEST).json({
                    succes: false,
                    error: "El ID proporcionado no es válido.",
                    status_code: HttpCode.BAD_REQUEST
                });

            if (!finduser) return res.json({ message: "Usuario no encontrado" }).status(HttpCode.NOT_FOUND)
            
            logger.info(`Usuario con id ${id} obtenido`)
            return res.json({
                succes: true,
                data: {
                    user: finduser
                },
                message: "Usuario encontrado con exito",
                status_code: HttpCode.OK
            })
        } catch (e) {
            logger.info("Hubo un error al intentar encontrar un usuario por su Id" + e)
            return res.json({
                succes: false,
                message: "Error del servidor",
                status_code: HttpCode.INTERNAL_SERVER_ERROR
            })
        }
    }

    /**
     * 
     * @param {req} req 
     * @param {res} res 
     */

    async getUserByUsername(req, res) {
        try {
            const { username } = req.params;

            const finduser = await User.findOne({ username });

            if (!finduser) {
                logger.info(`Usuario con nombre de usuario ${username} no encontrado`);
                return res.status(HttpCode.NOT_FOUND).json({
                    succes: false,
                    message: "Usuario no encontrado",
                    status_code: HttpCode.NOT_FOUND
                });
            }

            logger.info(`Se buscaron datos del usuario: [Nombre] | ${finduser.username} | [ID] | ${finduser._id}`);
            return res.status(HttpCode.OK).json({ data: {id: finduser._id, user: finduser } });
        } catch (e) {
            logger.error(`Hubo un error al buscar el usuario: ${e.message}`);
            return res.status(HttpCode.INTERNAL_SERVER_ERROR).json({ 
                succes: false,
                message: "Error del servidor",
                status_code: HttpCode.INTERNAL_SERVER_ERROR
            });
        }
    }

    /**
     * 
     * @param {req} req 
     * @param {res} res 
     */

    async registerUser(req, res) {
        try {
            const { username, password, email } = matchedData(req)

            const emailVerify = await verifyEmail(email)
            const hashedpass = await hashPassword(password)

            if(emailVerify){
                return res.json({
                    succes: false,
                    data: {
                        message: "El correo ya esta registrado"
                    },
                    status_code: HttpCode.BAD_REQUEST
                })
            }

            const data = new User({
                username,
                password: hashedpass,
                email
            })

            await data.save()
            logger.info(`Se ah creado una cuenta: ID | ${data._id}`)
            return res.json({
                sussces: true,
                data: {
                    user: data,
                },
                message: "Se ha creado el usuario correctamente!",
                status_code: HttpCode.CREATED,
            })

        } catch (e) {
            logger.error("Hubo un error al crear un usuario: " + e)
            return res.json({ error: e, status_code: HttpCode.INTERNAL_SERVER_ERROR })
        }
    }

    /**
     * 
     * @param {req} req 
     * @param {res} res 
     */

    async logginUser(req, res, next) {
        passport.authenticate('local', (err, user, info) => {
            if (err) {
                logger.error(`Error en la autenticación: ${err.message}`);
                return res.status(HttpCode.INTERNAL_SERVER_ERROR).json({ error: err.message });
            }
    
            if (!user) {
                logger.error(`Usuario no encontrado o contraseña incorrecta: ${info.message}`);
                return res.status(HttpCode.UNAUTHORIZED).json({ error: info.message });
            }
    
            req.login(user, (err) => {
                if (err) {
                    logger.error(`Error al iniciar sesión: ${err.message}`);
                    return res.status(HttpCode.INTERNAL_SERVER_ERROR).json({ error: err.message });
                }
    
                logger.info(`Se ha iniciado sesión: ID | ${user.id} | NAME | ${user.username}`)

                res.status(HttpCode.OK).json({
                    success: true,
                    data: { user },
                    redirectUrl: "/dashboard",
                    message: "Inicio de sesión exitoso",
                    status_code: HttpCode.OK
                });
            });
        })(req, res, next);
    }

    /**
     * 
     * @param {req} req 
     * @param {res} res 
     */

    async updateUserById(req,res){
        try {
            const { id } = req.params
            const { username, password, email, role} = matchedData(req)

            console.log(password)
            const emailVerify = await verifyEmail(email)
            const hashedPassword = await hashPassword(password)

            if(emailVerify){
                return res.json({
                    succes: false,
                    data: {
                        message: "El correo ya esta registrado"
                    },
                    status_code: HttpCode.BAD_REQUEST
                })
            }

            let updateFields = { username, password, email, role }

            if(password){
                updateFields.password =  hashedPassword
            }
            const updatedUser = await User.findOneAndUpdate(
                { _id: id},
                { $set: updateFields },
                { new: true }
            )

            logger.info(`Usuario Actualizado: ID | ${id}`)
            return res.json({ succes: true, data: { updatedUser }, message: "Usuario actualizado correctamente", status_code: HttpCode.OK})
            .status(HttpCode.OK)
        } catch (error) {
            console.log(error)
        }
    }
    async deleteUserById(req, res) {
            try {
                const { id } = req.params;
    
                if (!mongoose.Types.ObjectId.isValid(id)) {
                    return res.status(HttpCode.BAD_REQUEST).json({
                        error: "El ID proporcionado no es válido.",
                        status_code: HttpCode.BAD_REQUEST
                    });
                }
    
                const deletedUser = await User.findByIdAndDelete(id);
    
                if (!deletedUser) {
                    logger.info(`Un usuario ah sido eleminado: ${id}`);
                    return res.status(HttpCode.NOT_FOUND).json({ message: "Usuario no encontrado" });
                }
    
                logger.info(`Usuario con id ${id} eliminado`);
                return res.status(HttpCode.OK).json({ data: { success: true, message: "Se ha borrado correctamente al usuario" } });
            } catch (e) {
                logger.error("Hubo un error al eliminar al usuario: " + e);
                return res.status(HttpCode.INTERNAL_SERVER_ERROR).json({ error: e.message });
            }
        }

    async deleteAnyUsers(req, res){
        try {
            const deletedUsers = await User.deleteMany()
            logger.info(`Se eliminaron ${deletedUsers.deletedCount} usuarios`)
            return res.status(HttpCode.OK).json({ data: { success: true, message: "Se han borrado todos los usuarios" } })
            
        } catch (e) {
            logger.error("Hubo un error al eliminar todos los usuarios: " + e)
            return res.status(HttpCode.INTERNAL_SERVER_ERROR).json({ error: e.message })
        }
    

    }

    async asignRoleForUser(req, res){
        try {
            const { id } = req.params
            const { role } = req.body
            const findUser = await User.findById(id)

            if(!findUser) return res.status(HttpCode.NOT_FOUND).json({ message: "Usuario no encontrado" })
                
            findUser.role = role

            await findUser.save()
            logger.info(`Se asigno el rol ${role} al usuario con id ${id}`)
            return res.status(HttpCode.OK).json({ data: { success: true, message: "Se ha asignado el rol correctamente" }, status_code: HttpCode.OK })
        }catch(error){
            console.log(error)
        }
    }

}

const UserController = new UserServices()

export { UserController }