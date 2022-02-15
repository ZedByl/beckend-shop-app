const {Schema, model} = require('mongoose');

const schema = new Schema({
    image: {type: String},
    title: {type: String, required: true},
    body: {type: String},
    typeId: {type: String},
    type: {type: String, required: true},
    price: {type: String, required: true},
    count: {type: Number}
}, {
    timestamps: {createdAt: 'created_at'}
});

module.exports = model('Product', schema);