const mongoose = require('mongoose');

const clotheSchema = new mongoose.Schema({
    cloName: {
        type: String,
        required: true
    },
    cloImgLink: {
        type: String,
        required: true
    },
    cloType: {
        type: String,
        required: true
    },
    cloStyle: {
        type: String,
        required: true
    },
    cloSizes: {
        type: String,
        required: true
    },
    cloBrand: {
        type: String,
        required: true
    },
    cloMat: {
        type: String,
        required: true
    },  
    cloColorPrim: {
        type: String,
        required: true
    },
    priceEuro: {
        type: Number,
        required: true
    },
    onDiscount: {
        type: Boolean,
        required: true
    }
});

module.exports = mongoose.model('Clothe', clotheSchema);

 