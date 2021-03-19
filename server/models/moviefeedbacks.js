const mongoose = require("mongoose");
const { Schema } = mongoose;

const reviewinfo = new Schema({
    email: {
        type: String,
        required: true,
    },
    rating: {
        type : Number,
        required: true,
    },
    feedbackdesc: {
        type : String,
        required: true,
    },
    moviename : {
        type : String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now()
    },
    updatedAt: {
        type: Date,
        default: Date.now()
    }
});

module.exports = mongoose.model('ReviewDetails', reviewinfo);