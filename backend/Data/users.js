import bcryptjs from "bcryptjs"

const users = [
  {
    name: "Harsh",
    email: "harsh@gmail.com",
    password: bcryptjs.hashSync("qwertyuiop"),
    isAdmin: true,
  },
  {
    name: "Test",
    email: "testuser@proshop.com",
    password: bcryptjs.hashSync("test123"),
  },
]

export default users
