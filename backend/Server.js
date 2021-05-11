const express = require("express")
const products = require("./Data/products")
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

const PORT = 5000 || process.env.PORT
app.listen(PORT, () => {
  console.log(`Server Running on PORT ${PORT}`)
})
