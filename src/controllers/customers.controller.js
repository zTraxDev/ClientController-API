import mongoose from "mongoose";
import logger from "../utils/logger.js";
import { Client } from "../database/models/clientModel.js"
import { matchedData } from "express-validator";
import { HttpCode } from "../helpers/HttpHelper.js";
import { verifyEmail } from "../helpers/VerifyEmail.js";
import { hashPassword, comparePassword } from "../helpers/crypt.js";
import bcrypt from "bcrypt"

/**
 * @class 
 */

class clientController {
    
    /**
     * 
     * @param {req} req 
     * @param {res} res 
     */
    async getAllClients(req, res){
        try{
            const findClients = await Client.find()

            console.log(findClients)
            if(findClients.length == 0) return res.json({ succes: true, message: "Lista de clientes vacia", status_code: HttpCode.OK}).status(HttpCode.OK)
    
            return res.json({ data: findClients})
            logger.info("Lista de Clientes obtenida")
        }catch(e){
            console.log(e)
        }
    }

    /**
     * 
     * @param {req} req 
     * @param {res} res 
     */
    async getClientById(req, res){
        try{
            const { id } = matchedData(req)
            const findClient = await Client.findById(id)

            if(!findClient) return res.json({ succes: false, message: "Cliente no encontrado", status_code: HttpCode.NOT_FOUND}).status(HttpCode.NOT_FOUND)
            
            return res.json({ succes: true, data:{ findClient}, message: "Cliente encontrado"})
        }catch(e){
            console.log(e)
        }

    }
}

const ClientController = new clientController()

export { ClientController }