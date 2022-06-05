import { CustomError } from "./error.js"
import connection from "./mysql.js"

const getUser = async (email) => {
  const [rows] = await connection.query("SELECT * from user WHERE email = ?", [email])
  const user = rows[0]
  if (!user) throw new CustomError(404, "User not found")
  return user
}

const getUserById = async (id) => {
  const [rows] = await connection.query("SELECT * from user WHERE userId = ?", [id])
  const user = rows[0]
  if (!user) throw new CustomError(404, "User not found")
  return user
}

const getUserByEmail = async (email) => {
  const [rows] = await connection.query("SELECT * from user WHERE email = ?", [email])
  const user = rows[0]
  if (!user) throw new CustomError(404, "User not found")
  return user
}

export { getUser, getUserById, getUserByEmail }
