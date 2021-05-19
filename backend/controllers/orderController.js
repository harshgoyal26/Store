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
    res.status(201).json(createdOrder)
  }
})

// @Desc - getOrderById
// @Extended Route - /:id  GET PRIVATE
const getOrderById = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id).populate(
    "user",
    "name email"
  )
  if (order) {
    res.json(order)
  } else {
    res.status(404)
    throw new Error("Order Not Found")
  }
})

// @Desc - updateOrderToPaid
// @Extended Route - /:id/pay  PUT PRIVATE
const updateOrderToPaid = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id)
  if (order) {
    order.isPaid = true
    order.paidAt = Date.now()
    order.paymentResult = {
      id: req.body.id,
      status: req.body.status,
      update_time: req.body.update_time,
      email_address: req.body.payer.email_address,
    }
    const updatedUser = await order.save()
    res.json(updatedUser)
  } else {
    res.status(404)
    throw new Error("Order Not Found")
  }
})

export { addOrderItem, getOrderById, updateOrderToPaid }
