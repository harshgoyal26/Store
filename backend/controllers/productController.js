import asyncHandler from "express-async-handler"
import Product from "../models/productModel.js"

// @ROUTE - /api/products + "whatever"

// @Desc - Fetch all products
const getProducts = asyncHandler(async (req, res) => {
  const products = await Product.find({})
  res.json(products)
})

// @Desc - Fetch Product By ID
const getProductById = asyncHandler(async (req, res) => {
  const id = req.params.id
  const product = await Product.findById(id)
  if (product) {
    res.json(product)
  } else {
    // Because we have created middleware to handle error now
    res.status(404)
    throw new Error("Product not found")
  }
})

export { getProductById, getProducts }
