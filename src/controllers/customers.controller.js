import mongoose from "mongoose";
import logger from "../utils/logger.js";
import { Client } from "../database/models/clientModel.js"
import { User } from "../database/models/userModel.js";
import { matchedData } from "express-validator";
import { HttpCode } from "../helpers/HttpHelper.js";
import { verifyEmail } from "../helpers/VerifyEmail.js";
import { hashPassword, comparePassword } from "../helpers/crypt.js";
import bcrypt from "bcrypt"
import moment from "moment";

/**
 * @class 
 * @author zTrax
 * @description Clase que contiene todas las funciones e logistica de los clientes: new clientController().function()
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
            const { id } = req.params
            const findClient = await Client.findById(id)

            if(!findClient) return res.json({ succes: false, message: "Cliente no encontrado", status_code: HttpCode.NOT_FOUND}).status(HttpCode.NOT_FOUND)
            
            logger.info(`Cliente Encontrado: [OWNER] ${req.user.username} | [CLIENT_ID] ${id}`)
            return res.json({ succes: true, data:{ findClient}, message: "Cliente encontrado", status_code: HttpCode.OK})
            .status(HttpCode.OK)
            } catch(e) {
            console.log(e)
        }

    } 

    /**
     * 
     * @param {req} req 
     * @param {res} res 
    */

    async getClientByUsername(req, res){
        try {
            const { username } = req.params
        } catch (error) {
            
        }
    }

    /**
     * 
     * @param {req} req 
     * @param {res} res 
     */
    async createClient(req, res) {
        try {
            const { name, last_name, pago, date_pay, last_pay, client_status } = matchedData(req);
    
            const findClient = await Client.findOne({ name });
            if (findClient) {
                return res.status(HttpCode.CONFLICT).json({ 
                    succes: false, 
                    message: "Cliente ya existe", 
                    status_code: HttpCode.CONFLICT 
                });
            }
    
            let newClient = new Client({
                name,
                last_name,
                pago,
                date_pay: moment(date_pay, 'YYYY/MM/DD').toDate(),   // Convertir a Date
                last_pay: moment(last_pay, 'YYYY/MM/DD').toDate(),
                client_status,
                user: req.user._id
            });
    
            await newClient.save();
    
            await User.findByIdAndUpdate(req.user._id, {
                $push: { clients: newClient._id }
            });
    
            const { user, _id, ...clientData } = newClient.toObject();
            
            const formattedClient = {
                ...clientData,
                date_pay: moment(newClient.date_pay).format('YYYY/MM/DD'),
                last_pay: moment(newClient.last_pay).format('YYYY/MM/DD')
            };
    
            return res.status(HttpCode.CREATED).json({ 
                succes: true,
                creatorId: req.user._id, 
                data: {
                    client: formattedClient
                },
                message: "Cliente creado",
                status_code: HttpCode.CREATED
            });
    
        } catch (error) {
            console.log(error);
            logger.error(`Error al crear un cliente: ${error}`);
            return res.status(HttpCode.INTERNAL_SERVER_ERROR).json({ 
                succes: false, 
                message: "Error del servidor", 
                status_code: HttpCode.INTERNAL_SERVER_ERROR 
            });
        }
    }
}

const ClientController = new clientController()

export { ClientController }