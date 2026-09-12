const mongoose = require('mongoose');
const productSchema = new mongoose.Schema({
    name: {
        type : String,
        required: true,
    },
    price: {
        type: Number,
        required: true
    },
    originalPrice: {
        type: Number,

    },
    image: {
        type: String,
        required: true
    },
    category:{
        type: String,
        required: true
    },
    stock : {
        type: Number,
        default: 100
    },
    //Amazon product details
    asin: {
        type: String,
        unique: true,
        sparse: true,
    },
    affilateUrl : {
        type:String,
    },

    source: {
        type: String,
        default: "amazon",
    },
    availablity: {
        type: String,
    },
    lastSynceAt: {
        type: Date,
    },

}, {timestamps: true});

module.exports = mongoose.model('Product', productSchema);
