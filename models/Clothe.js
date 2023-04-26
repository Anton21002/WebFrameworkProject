const mongoose = require('mongoose');

const clotheSchema = new mongoose.Schema({
    cloName : {
        type : String,
        require: true
    },
    cloImgLink : String,
    cloType : String,
    cloStyle : String,
    cloSizes : String,
    cloBrand : String,
    cloMat : String,  
    cloColorPrim : String,
    priceEuro : Number,
    onDiscount : Boolean
});

module.exports = mongoose.model('Clothe', clotheSchema);