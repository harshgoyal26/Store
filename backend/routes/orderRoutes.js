import express from "express"
const router = express.Router()
import protect from "../middleware/authMiddleware.js"
import { addOrderItem, getOrderById } from "../controllers/orderController.js"

router.route("/").post(protect, addOrderItem)
router.route("/:id").get(protect, getOrderById)

export default router
