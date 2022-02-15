const {Schema, model} = require('mongoose');

const schema = new Schema({
    title: {type: String, required: true, unique: true},
}, {
    timestamps: {createdAt: 'created_at'}
});

module.exports = model('Category', schema);