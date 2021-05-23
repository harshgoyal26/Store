import express from "express"
const router = express.Router()
import { protect } from "../middleware/authMiddleware.js"
import {
  addOrderItem,
  getAllUserOrders,
  getOrderById,
  updateOrderToPaid,
} from "../controllers/orderController.js"

router.route("/").post(protect, addOrderItem)
router.route("/myorders").get(protect, getAllUserOrders)

router.route("/:id").get(protect, getOrderById)
router.route("/:id/pay").put(protect, updateOrderToPaid)

export default router
