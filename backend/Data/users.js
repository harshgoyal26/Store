import bcryptjs from "bcryptjs"

const users = [
  {
    name: "Vasu",
    email: "vasu@proshop.com",
    password: bcryptjs.hashSync("Vasucr@007"),
    isAdmin: true,
  },
  {
    name: "Test",
    email: "testuser@proshop.com",
    password: bcryptjs.hashSync("test123"),
  },
]

export default users
