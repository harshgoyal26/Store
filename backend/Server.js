import express from "express"
import dotenv from "dotenv"
import products from "./Data/products.js"

dotenv.config()
const app = express()

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

const PORT = process.env.PORT || 5000
app.listen(PORT, () => {
  console.log(`Server Running in ${process.env.NODE_ENV} mode on PORT ${PORT}`)
})
