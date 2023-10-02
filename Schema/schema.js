const mongoose = require('mongoose')

const contact = new mongoose.Schema({
    email: {
        type: String,
        trim: true,
        require: true
    },
    message: {
        type: String,
        trim: true,
        require: true
    }
})

module.exports = mongoose.model('Contacts', contact)