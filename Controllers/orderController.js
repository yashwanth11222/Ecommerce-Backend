const Orders = require('../Models/OrdersModel');
const Cart = require('../Models/CartModel');
const asyncHandler = require('express-async-handler');

const placeOrder = asyncHandler(async(req,res)=>{
    const cart = await Cart.findOne({userId: req.user.id}).populate('items.productId');
    if(!cart || cart.items.length===0){
        res.status(400);
        throw new Error('Add itmes to cart');
    }
    const orderItems = cart.items.map(item => ({
        productId: item.productId,
        quantity: item.quantity
    }));
    const totalAmount = cart.items.reduce((sum, item) => { 
        return sum + item.productId.price * item.quantity; }, 0);

    const order = await Orders.create({
        userId: req.user.id,
        items: orderItems,
        totalAmount,
        orderStatus: 'Placed'
    });

    cart.items = [];
    await cart.save();
    res.json({data: order});
});

const getAllOrders = asyncHandler(async(req,res)=>{
    const orders = await Orders.find({userId: req.user.id}).populate('items.productId');
    if(!orders){
        res.status(400);
        throw new Error('No order placed yet!')
    }
    res.json({data: orders})
});

const cancelOrder = asyncHandler(async(req,res)=>{
    const order = await Orders.findOne({_id: req.params.id, userId: req.user.id});
    if(!order){
        res.status(400);
        throw new Error('No order found')
    }
    if(order.orderStatus!=='delivered'){
        order.orderStatus='cancelled'
    }
    await order.save();
    res.json({data: order})
});

module.exports = {cancelOrder, getAllOrders, placeOrder}
