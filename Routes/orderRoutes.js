const express = require('express');
const router = express.Router();
const { Protect } = require('../Middlewares/authMiddleware');
const {getAllOrders, cancelOrder, placeOrder} = require('../Controllers/orderController');

router.get('/order', Protect, placeOrder);
router.get('/orderspage', Protect, getAllOrders);
router.put('/cancel/:id', Protect, cancelOrder);

module.exports = router;
