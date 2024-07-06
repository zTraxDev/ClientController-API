import { Schema, model } from "mongoose"
import moment from "moment"

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
        default: Date.now,
        required: true
    },
    last_pay: {
        type: Date,
        default: Date.now,
        required: true
    },
    client_status: {
        type: String,
        enum: ['Pago', 'Sin Pagar', 'Pendiente', 'Sin Agregar'],
        default: 'Sin Agregar'
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }
})

ClientSchema.methods.formatDates = function() {
    this.date_pay = moment(this.date_pay).format('YYYY/MM/DD - HH:mm');
    this.last_pay = moment(this.last_pay).format('YYYY/MM/DD - HH:mm');
};

ClientSchema.methods.toJSON = function() {
    const userObject = this.toObject();
    delete userObject._id;
    delete userObject.__v;
    delete userObject.user;
    return userObject;
};


const Client = model('Client', ClientSchema)


export { Client }