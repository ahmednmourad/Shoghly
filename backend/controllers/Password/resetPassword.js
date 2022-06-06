import connection from "../../util/mysql.js"
import { encryptPassword } from "../../util/passwords.js"
import jwt from "jsonwebtoken"

export default async (req, res, next) => {
  try {
    const token = req.params.token
    const newPassword = req.body.password
    const hashedPass = await encryptPassword(newPassword)

    const decodedToken = jwt.verify(token, process.env.JWT_SECRET_KEY)
    if (!decodedToken) return res.status(401).json({ message: "Not authenticated, No authorization header" })
    const userId = decodedToken.userId

    await connection.query("UPDATE user SET password = ? WHERE userId = ?", [hashedPass, userId])
    console.log("Password changed successfully!")
    return res.status(200).json({ message: "password changed successfully" })
  } catch (err) {
    next(err)
  }
}
