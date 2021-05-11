import express from "express"
import dotenv from "dotenv"
import ConnectDB from "./DatabaseConfig/dbconfig.js"
import colors from "colors"
import productRoutes from "./routes/productRoutes.js"

const app = express()

// Configurations
dotenv.config()
ConnectDB()

//Routing using Router
app.use("/api/products", productRoutes)

// Listening
const PORT = process.env.PORT || 5000
app.listen(PORT, () => {
  console.log(
    `Server Running in ${process.env.NODE_ENV} mode on PORT ${PORT}`.blue
      .inverse
  )
})
