import connection from "../../util/mysql.js"
import { v4 as uuidv4 } from "uuid"
import { encryptPassword } from "../../util/passwords.js"
import { CustomError } from "../../util/error.js"

export default async (req, res, next) => {
  console.log(req.body)
  const { firstName, lastName, email, country, city, password, phone, picture, line, role, profession, gender } = req.body
  const userId = uuidv4()

  try {
    if (!password) throw new CustomError(400, "Password not provided")
    const encryptedPassword = await encryptPassword(password)
    const user = { userId, password: encryptedPassword, firstName, lastName, role, email, country, city, phone, gender, line, picture, profession }
    await connection.query("INSERT INTO user set ?", user)
    return res.status(201).json({ message: "User created", id: userId })
  } catch (err) {
    next(err)
  }
}
