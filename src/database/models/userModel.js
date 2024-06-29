import { Schema, model } from "mongoose"

const userSchema = new Schema({
    username: {
        type: String,
    },
    password: {
        type: String,
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    role: {
        type: String,
        enum: ['admin', 'Ninguno'],
        default: 'Ninguno'
    }
},{ timestamps: true})

userSchema.methods.toJSON = function() {
    const userObject = this.toObject();
    delete userObject._id;
    delete userObject.createdAt;
    delete userObject.updatedAt;
    delete userObject.__v;
    return userObject;
};

const User = model('User', userSchema)

export { User }