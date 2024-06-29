import { Schema, model } from "mongoose"

const ClientSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    last_name: {
        type: String,
        required: true
    },
    pago: {
        type: Number,
        required: true
    },
    date_pay: {
        type: Date,
        required: true
    },
    last_pay: {
        type: Date,
        required: true
    },
    client_status: {
        type: String,
        enum: ['Pago', 'Sin Pagar', 'Pendiente', 'Sin Agregar'],
        default: 'Sin Agregar'
    }
})

const Client = model('Client', ClientSchema)

export default Client