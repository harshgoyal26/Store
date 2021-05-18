import express from "express"
const router = express.Router()
import protect from "../middleware/authMiddleware.js"
import { addOrderItem } from "../controllers/orderController.js"

router.route("/").post(protect, addOrderItem)

export default router
