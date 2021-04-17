const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define collection and schema
let Portfolio = new Schema({
    client: {
        type: String
    },
    location: {
        type: String
    },
    budget: {
        type: Number
    },
    surface_area: {
        type: Number
    },
    sector: {
        type: String
    },
    construction: {
        type: String
    },
    project_description: {
        type: String
    },
    important_facts: {
        type: String
    },
    imagePath: {
        type: String
    },
}, {
    collection: 'portfolio'
})

module.exports = mongoose.model('Portfolio', Portfolio)