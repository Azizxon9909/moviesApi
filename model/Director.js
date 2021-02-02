const mongoose = require('mongoose');
const DirectorSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    surname: {
        type: String,
        required: true
    },
    bio: {
        type: String,
        required: true
    },
    dates: {
        type: Date,
        default: Date.now
    }
})
module.exports = mongoose.model('director', DirectorSchema)
