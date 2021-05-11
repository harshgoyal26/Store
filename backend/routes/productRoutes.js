import express from "express"
import asyncHandler from "express-async-handler"
const router = express.Router()
import Product from "../models/productModel.js"

// @ROUTE - /api/products + "whatever"

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
      res.status(404).json({ Message: "There is no product like that" })
    }
  })
)

export default router
