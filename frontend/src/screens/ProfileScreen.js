import React, { useState, useEffect } from "react"
import { Row, Col, Form, Button } from "react-bootstrap"
import { Link } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import { getUserDetails } from "../actions/userActions"
import Message from "../components/Message"
import Loader from "../components/Loader"

const ProfileScreen = ({ location, history }) => {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [message, setMessage] = useState(null)

  const dispatch = useDispatch()
  const { loading, user, error } = useSelector((state) => state.userDetails)

  // If user is already Logged In access to register is revoked
  const isLogin = useSelector((state) => state.userLogin.userInfo)

  useEffect(() => {
    if (!isLogin) {
      history.push("/login")
    } else {
      if (!user.name) {
        dispatch(getUserDetails("profile"))
      } else {
        setName(user.name)
        setEmail(user.email)
      }
    }
  }, [history, isLogin, dispatch, user])

  const submitHandler = (e) => {
    e.preventDefault()
    if (password === confirmPassword) {
      setMessage(null)
    } else {
      setMessage("Password Don't Match")
    }
  }

  return (
    <Row className='py-3'>
      <Col md={3}>
        <h2>User Profile</h2>
        {message && <Message variant='danger'>{message}</Message>}
        {error && <Message variant='danger'>{error}</Message>}
        {loading && <Loader />}
        <Form onSubmit={submitHandler}>
          <Form.Group controlId='name'>
            <Form.Label>Name:</Form.Label>
            <Form.Control
              type='name'
              placeholder='Enter Name'
              value={name}
              onChange={(e) => setName(e.target.value)}
            ></Form.Control>
          </Form.Group>
          <Form.Group controlId='email'>
            <Form.Label>Email Address:</Form.Label>
            <Form.Control
              type='email'
              placeholder='Enter Email'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            ></Form.Control>
          </Form.Group>
          <Form.Group controlId='password'>
            <Form.Label>Password </Form.Label>
            <Form.Control
              type='password'
              placeholder='Enter Password'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            ></Form.Control>
          </Form.Group>
          <Form.Group controlId='confirmpassword'>
            <Form.Label>Confirm Password </Form.Label>
            <Form.Control
              type='password'
              placeholder='Confirm Password'
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            ></Form.Control>
          </Form.Group>
          <Button type='submit' varinat='primary'>
            Update
          </Button>
        </Form>
      </Col>
      <Col md={9}>
        <h2>My Orders</h2>
      </Col>
    </Row>
  )
}

export default ProfileScreen
