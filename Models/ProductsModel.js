const {Schema, model} = require('mongoose');

const ProductSchema = new Schema({
    name:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    brand:{
        type:String,
        required:true
    },
    // image:{
    //     type:String,
    //     required:true
    // },
    category:{
        type:String,
        enum:["Electronics", "Clothing", "Accessories", "Home Appliances"],
        required:true
    },
    stock:{
        type:Number,
        required:true,
        default:100
    },
    price:{
        type:Number,
        required:true
    }
});

const productModel = model('products', ProductSchema);
module.exports = productModel;
