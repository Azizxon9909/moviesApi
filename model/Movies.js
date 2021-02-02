const mongoose = require('mongoose');
const MoviesSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    year: {
        type: Number,
        required: true
    },
    director_id: mongoose.Schema.Types.ObjectId,
    imbd_score: {
        type: Number,
        required: true
    }
})
module.exports = mongoose.model('cinema', MoviesSchema)
