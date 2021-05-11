import express from "express"
import dotenv from "dotenv"
import products from "./Data/products.js"
import ConnectDB from "./DatabaseConfig/dbconfig.js"
import colors from "colors"

// Configurations
dotenv.config()
const app = express()
ConnectDB()

// Routes
app.get("/", (req, res) => {
  res.send("SERVER RUNNING")
})

app.get("/api/products", (req, res) => {
  res.send(products)
})

app.get("/api/products/:id", (req, res) => {
  const id = req.params.id
  const product = products.find((p) => p._id === id)
  res.send(product)
})

// Listening
const PORT = process.env.PORT || 5000
app.listen(PORT, () => {
  console.log(
    `Server Running in ${process.env.NODE_ENV} mode on PORT ${PORT}`.blue
      .inverse
  )
})
