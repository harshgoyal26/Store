import React, { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Link } from "react-router-dom"
import { Col, Row, Card, Form, Image, ListGroup, Button } from "react-bootstrap"
import { addToCart } from "../actions/cartActions"
import Message from "../components/Message"

const CartScreen = ({ match, history, location }) => {
  const productId = match.params.id
  const qty = location.search ? Number(location.search.split("=")[1]) : 1
  const dispatch = useDispatch()
  const cart = useSelector((state) => state.cart)
  const { cartItems } = cart
  useEffect(() => {
    if (productId) {
      dispatch(addToCart(productId, qty))
    }
  }, [productId, qty, dispatch])

  return <div>cart</div>
}

export default CartScreen
