const { Schema, model} = require('mongoose')
const mongoose = require('mongoose');

const CartSchema = new Schema(
    {
        userId:{
            type: mongoose.Schema.Types.ObjectId,
            required:true,
            ref:'user'
        },
        items:[{
            productId: {
                type: mongoose.Schema.Types.ObjectId,
                required:true,
                ref:'products'
            },
            quantity:{
                type:Number,
                required:true,
                min:1
            }
        }],
    },
    {
        timestamps:true
    }
);

const cartModel = model('cart', CartSchema);
module.exports = cartModel
