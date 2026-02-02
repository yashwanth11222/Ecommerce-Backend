const Cart = require('../Models/CartModel');
const Product = require('../Models/ProductsModel');
const asyncHandler = require('express-async-handler');


// Get user's cart
const getCart = asyncHandler(async(req,res)=>{
    const cart = await Cart.findOne({userId: req.user._id}).populate('items.productId');
    if(!cart){
        res.status(400);
        throw new Error('No itmes In Cart');
    }
    res.json({ data: cart })
})


// Add item to cart
const addToCart = asyncHandler(async(req,res)=>{
    const {productId, quantity} = req.body;
    const cart = await Cart.findOne({ userId: req.user._id }).populate('items.productId');
    if(!cart){
        cart = await Cart.create({userId: req.user.id, items:[]});
    }
    const already_in_cart = cart.items.findIndex((item)=> item.productId.toString()===productId);
    if(already_in_cart>-1){
        cart.items[already_in_cart].quantity+=quantity;
    }else{
        cart.items.push({
            productId,
            quantity
        });
        await cart.save();
    };
    res.json({ data: cart })
});


// Update item quantity in cart
const updateCartItem = asyncHandler(async(req,res)=>{
    const {itemId} = req.params;
    const {quantity} = req.body;

    const cart = await Cart.findOne({userId: req.user._id});
    if(!cart){
        res.status(400);
        throw new Error('Cart not found');
    }
    const item = cart.items.id(itemId);
    if(!item){
        res.status(400);
        throw new Error('Item not found')
    }
    item.quantity = quantity
    res.json({data: cart});
});


// Remove item from cart
const removeCartItem = asyncHandler(async(req,res)=>{
    const { itemId } = req.params;
    const cart = await Cart.findOne({userId: req.user._id});
    if(!cart){
        res.status(400);
        throw new Error('No cart found!')
    }
    cart.items.id(itemId).remove();
    await cart.save();
    res.json({data: cart})
});


// Clear entire cart
const clearCart = asyncHandler(async(req,res)=>{
    const cart = await Cart.findOne({userId: req.user._id});
    if(!cart){
        res.status(400);
        throw new Error('No cart found')
    }
    cart.items = []
    res.json({data: cart});
});


module.exports = {getCart, addToCart, updateCartItem, removeCartItem, clearCart};
