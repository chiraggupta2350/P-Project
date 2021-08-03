const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema.Types


const productSchema = new mongoose.Schema({
    productname:{
        type:String,
        required:true
    },
    producttype:{
        type:String,
        required:true
    },
    size:{
       type:String,
       required:true 
    },
    quantity:{
       type:String,
       required:true
    },
    productcolor:{
        type:String,
        required:true
    },
    url:{
        type:String,
        required:true
    },
    userId:{
        type:ObjectId,
        ref:"USER"
    }
})

const Product = mongoose.model("PRODUCT",productSchema)

module.exports = Product;