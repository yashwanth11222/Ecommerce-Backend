const express = require('express');
const {getCart, addToCart, updateCartItem, removeCartItem, clearCart} = require('../Controllers/cartController');
const router = express.Router();
const {Protect} = require('../Middlewares/authMiddleware');

router.get('/getitems', Protect, getCart);
router.post('/additem', Protect, addToCart);
router.put('/item/:itemId', Protect, updateCartItem);
router.delete('/item/:itemId', Protect, removeCartItem);
router.delete('/items', Protect, clearCart);

module.exports = router;
