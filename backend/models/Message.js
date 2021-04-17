const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define collection and schema
let Message = new Schema({
    name: {
        type: String
    },
    email: {
        type: String
    },
    subject: {
        type: String
    },
    message: {
        type: String
    },
}, {
    collection: 'message'
})

module.exports = mongoose.model('Message', Message)