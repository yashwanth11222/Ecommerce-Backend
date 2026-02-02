const express = require('express');
const router = express.Router();
const {getProducts, getProductbyId, addProduct, getProductsByCategory, getProductsBybrand} = require('../Controllers/productController');
const { isAdmin } = require('../Middlewares/authMiddleware');

router.get('/products', getProducts);
router.get('/product/:id',getProductbyId);
router.post('/addProduct', isAdmin, addProduct);
router.get('/items/:category', getProductsByCategory);
router.get('/brand', getProductsBybrand);


module.exports = router;
