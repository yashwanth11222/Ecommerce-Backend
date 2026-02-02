const products = require('../Models/ProductsModel');
const asyncHandler = require('express-async-handler');

const getProducts = asyncHandler(async(req,res)=>{
    const all_products = await products.find();

    res.json({
        allProducts: all_products
    })
});

const getProductbyId = asyncHandler(async(req,res)=>{
    const item = await products.findById(req.params.id);
    if(!item){
        res.status(400);
        throw new Error('No item found')
    }
    res.json({
        data: item
    })
})

const addProduct = asyncHandler(async(req,res)=>{
    const {name, description, brand, category, stock, price} = req.body;
    if(!name || !description || !brand || !category || !stock || !price){
        res.status(400);
        throw new Error('All fields are required!!');
    }
    const newProduct = await products.create({name, description, brand, category, stock, price});

    res.json({
        message:' product added!!',
        data: newProduct
    })
});


// GET products by category
const getProductsByCategory = asyncHandler(async (req, res) => {
  const category = req.params.category; // e.g. "Electronics"
  const items = await products.find({ category });

  if (!items || items.length === 0) {
    res.status(404);
    throw new Error("No products found for this category");
  }

  res.json({ data: items });
});

// GET products by brand
const getProductsBybrand = asyncHandler(async (req, res) => {
  const brandProducts = await products.aggregate([
    {
        $group:{
            _id: "$brand",
            products:{$push: "$$ROOT"},
            count:{$sum: 1}
        }
    },
    {
        $match:{
            count:{$gt:1}
        }
    }
  ]);

  res.json({ data: brandProducts });
});

module.exports = {getProducts, getProductbyId, addProduct, getProductsByCategory, getProductsBybrand};
