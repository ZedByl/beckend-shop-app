const {Schema, model} = require('mongoose');

const schema = new Schema({
    userId: {type: String},
    name: {type: String, required: true},
    email: {type: String, required: true},
    phone: {type: String, required: true},
    date: {type: Number, required: true},
    number: {type: Number, required: true},
    totalPrice: {type: Number, required: true},
    status: {type: String},
    pay: {type: String, required: true},
    street: {type: String},
    house: {type: String},
    entrance: {type: String},
    floor: {type: String},
    apartment: {type: String},
    intercom: {type: String},
    comment: {type: String},
    itemsProduct: [Object],
}, {
    timestamps: {createdAt: 'created_at'}
});

module.exports = model('Order', schema);