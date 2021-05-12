import express from "express"
import asyncHandler from "express-async-handler"
const router = express.Router()
import Product from "../models/productModel.js"

// @ROUTE - /api/products + "whatever"
// TRY CATCH IS NOT REQUIRED WE HAVE ERROR HANDLER

// - - - - - - - - - - - - - - - - - - - - - -
// @Desc - Fetch all products
router.get(
  "/",
  asyncHandler(async (req, res) => {
    const products = await Product.find({})
    res.json(products)
  })
)
// @Desc - Fetch product with given ID
router.get(
  "/:id",
  asyncHandler(async (req, res) => {
    const id = req.params.id
    const product = await Product.findById(id)
    if (product) {
      res.json(product)
    } else {
      // Becausee we have created middleware to handle error now
      res.status(404)
      throw new Error("Product not found")
    }
  })
)

export default router
