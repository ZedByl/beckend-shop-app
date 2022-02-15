const {Schema, model} = require('mongoose');

const schema = new Schema({
    name: {type: String, required: true},
    email: {type: String, required: true, unique: true},
    phone: {type: String, required: true, unique: true},
    password: {type: String, required: true},
    dateOfBirth: {type: String},
    image: {type: String},
    role: {type: String},
    street: {type: String},
    house: {type: String},
    entrance: {type: String},
    floor: {type: String},
    apartment: {type: String},
    intercom: {type: String},
    orders: [String]
}, {
    timestamps: true
});

module.exports = model('User', schema);