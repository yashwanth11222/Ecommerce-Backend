const {Schema, model} = require('mongoose');
const mongoose = require('mongoose');

const OrderSchema = new Schema(
    {
        userId:{
            type:mongoose.Schema.Types.ObjectId,
            required:true,
            ref:'user'
        },
        items:[{
            productId:{
                type:mongoose.Schema.Types.ObjectId,
                ref:'products',
                required:true
            },
            quantity:{
                type:Number,
                required:true
            }
        }],
        totalAmount:{
            type: Number,
            required:true
        },
        orderStatus:{
            type:String,
            enum: ['Placed', 'shipped', 'delivered', 'cancelled'],
            default:"Placed",
            required:true
        }
    },
    {
        timestamps:true
    }
);

const orderModel = model('orders', OrderSchema);
module.exports = orderModel;
