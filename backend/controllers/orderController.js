import asyncHandler from "express-async-handler"
import Order from "../models/orderModel.js"

// @ROUTE - /api/orders + "whatever"

// @Desc - createNewOrder
// @Extended Route - /  POST PRIVATE
const addOrderItem = asyncHandler(async (req, res) => {
  const {
    orderItems,
    shippingAddress,
    taxPrice,
    shippingPrice,
    totalPrice,
    itemsPrice,
    paymentMethod,
  } = req.body
  if (orderItems && orderItems.length === 0) {
    res.status(400)
    throw new Error("No Items to Order")
    return
  } else {
    const order = new Order({
      orderItems,
      shippingAddress,
      taxPrice,
      shippingPrice,
      totalPrice,
      itemsPrice,
      paymentMethod,
      user: req.user._id,
    })
    const createdOrder = await order.save()
    res.status(201)
    res.json(createdOrder)
  }
})

export default addOrderItem
