import bcryptjs from "bcryptjs"

const users = [
  {
    name: "Admin",
    email: "admin@proshop.com",
    password: bcryptjs.hashSync("admin123"),
    isAdmin: true,
  },
  {
    name: "Vasu",
    email: "vasu@proshop.com",
    password: bcryptjs.hashSync("vasu123"),
    isAdmin: true,
  },
  {
    name: "Test",
    email: "testuser@proshop.com",
    password: bcryptjs.hashSync("test123"),
    isAdmin: true,
  },
]

export default users
