import express from "express"
import dotenv from "dotenv"
import ConnectDB from "./DatabaseConfig/dbconfig.js"
import colors from "colors"
import productRoutes from "./routes/productRoutes.js"
import userRoutes from "./routes/userRoutes.js"
import orderRoutes from "./routes/orderRoutes.js"
import { notFound, errorHandler } from "./middleware/errorMiddleware.js"

const app = express()
app.use(express.json())
// Configurations
dotenv.config()
ConnectDB()

//Routing using Router
app.use("/api/products", productRoutes)
app.use("/api/users", userRoutes)
app.use("/api/orders", orderRoutes)

app.get("/api/config/paypal", (req, res) =>
  res.send(process.env.PAYPAL_CLIENTID)
)
// 404 Status error
app.use(notFound)
// Customized Error Handler
app.use(errorHandler)

// Listening
const PORT = process.env.PORT || 5000
app.listen(PORT, () => {
  console.log(
    `Server Running ${process.env.NODE_ENV} mode on PORT ${PORT}`.blue.inverse
  )
})
