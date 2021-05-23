import asyncHandler from "express-async-handler"
import User from "../models/userModel.js"
import generateToken from "../utils/generateToken.js"
// @ROUTE - /api/users/ + "whatever"

// @Desc - Login
// @Extended Route - /login PUBLIC
const authUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body
  const user = await User.findOne({ email })
  if (user && (await user.matchPassword(password))) {
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      token: generateToken(user._id, user.name),
    })
  } else {
    res.status(401)
    throw new Error("Invalid Email or Password")
  }
})

// @Desc - Register User
// @Extended Route - /login PUBLIC
const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body
  const userExists = await User.findOne({ email })
  if (userExists) {
    res.status(400)
    throw new Error("User Already Exists")
  }
  const user = await User.create({
    name,
    email,
    password,
  })
  if (user) {
    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      token: generateToken(user._id, user.name),
    })
  } else {
    res.status(400)
    throw new Error("Invalid User")
  }
})

// @Desc - (GET) USER PROFILE
// @Extended Route - /profile PRIVATE
const getUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id)
  if (user) {
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
    })
  } else {
    res.status(404)
    throw new Error("User Not Found")
  }
})

// @Desc - Update User Profile (PUT)
// @Extended Route - /profile PRIVATE
const updateUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id)

  if (user) {
    user.name = req.body.name || user.name
    user.email = req.body.email || user.email
    if (req.body.password) {
      user.password = req.body.password
    }
    const updatedUser = await user.save()
    res.json({
      _id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
      isAdmin: updatedUser.isAdmin,
      token: generateToken(updatedUser._id, updatedUser.name),
    })
  } else {
    res.status(404)
    throw new Error("User Not Found")
  }
})

// @Desc - (GET) ALL USER PROFILE
// @Extended Route - / PRIVATE/ADMIN
const getUsers = asyncHandler(async (req, res) => {
  const users = await User.find({})
  res.json(users)
})

export { authUser, registerUser, getUserProfile, updateUserProfile, getUsers }
