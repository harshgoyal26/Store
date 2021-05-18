import React from "react"
import { Col, Row, Image, ListGroup, Button, Card } from "react-bootstrap"
import { useSelector } from "react-redux"
import { Link } from "react-router-dom"
import Message from "../components/Message"
import CheckoutSteps from "../components/CheckoutSteps"

const PlaceOrderScreen = ({ history }) => {
  // LOGIN FIRST
  const isLogin = useSelector((state) => state.userLogin.userInfo)
  if (!isLogin) {
    history.push("/login")
  }
  const cart = useSelector((state) => state.cart)
  if (!cart.shippingAddress.address) {
    history.push("/shipping")
  }

  const addDecimals = (num) => {
    return (Math.round(num * 100) / 100).toFixed(2)
  }

  cart.itemsPrice = addDecimals(
    cart.cartItems
      .reduce((acc, item) => acc + item.qty * item.price, 0)
      .toFixed(2)
  )
  cart.shippingPrice = addDecimals(Number(cart.itemsPrice < 100 ? 5 : 0))
  cart.taxPrice = addDecimals(Number(cart.itemsPrice * 0.18).toFixed(2))
  cart.totalPrice = addDecimals(
    Number(cart.taxPrice) + Number(cart.shippingPrice) + Number(cart.itemsPrice)
  )

  const placeOrderHandler = (e) => {
    console.log("Order Placed !")
  }
  return (
    <>
      <CheckoutSteps step1 step2 step3 step4 />
      <Row>
        <Col md={8}>
          <ListGroup variant='flush'>
            <ListGroup.Item>
              <h2>Shipping</h2>
              <p>
                <strong>
                  Address: {cart.shippingAddress.address},{" "}
                  {cart.shippingAddress.city}, {cart.shippingAddress.postalCode}
                  , {cart.shippingAddress.country}
                </strong>
              </p>
            </ListGroup.Item>
            <ListGroup.Item>
              <h2>Payment Method</h2>
              <p>
                <strong>Method: {cart.paymentMethod}</strong>
              </p>
            </ListGroup.Item>
            <ListGroup.Item>
              <h2>Order Items</h2>
              {cart.cartItems.length !== 0 ? (
                <ListGroup variant='flush'>
                  {cart.cartItems.map((item, idx) => (
                    <ListGroup.Item key={idx}>
                      <Row>
                        <Col md={1}>
                          <Image
                            src={item.image}
                            alt={item.name}
                            fluid
                            rounded
                          />
                        </Col>
                        <Col>
                          <Link to={`/product/${item.product}`}>
                            {item.name}
                          </Link>
                        </Col>
                        <Col md={4}>
                          {item.qty} x ${item.price} = ${item.qty * item.price}
                        </Col>
                      </Row>
                    </ListGroup.Item>
                  ))}
                </ListGroup>
              ) : (
                <Message>Your Cart Is Empty</Message>
              )}
            </ListGroup.Item>
          </ListGroup>
        </Col>
        <Col md={4}>
          <Card>
            <ListGroup variant='flush'>
              <ListGroup.Item>
                <Row>
                  <Col>
                    <h2>ORDER SUMMARY</h2>
                  </Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Items</Col>
                  <Col>${cart.itemsPrice}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Shipping</Col>
                  <Col>${cart.shippingPrice}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Tax</Col>
                  <Col>${cart.taxPrice}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Total</Col>
                  <Col>${cart.totalPrice}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col></Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Button
                  onClick={placeOrderHandler}
                  className='btn-block'
                  type='button'
                  disabled={cart.cartItems.length === 0}
                >
                  Place Order
                </Button>
              </ListGroup.Item>
            </ListGroup>
          </Card>
        </Col>
      </Row>
    </>
  )
}

export default PlaceOrderScreen
