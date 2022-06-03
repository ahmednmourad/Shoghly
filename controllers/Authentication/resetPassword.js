import connection from "../../util/mysql.js"
import { encryptPassword } from "../../util/passwords.js"
import jwtDecode from "jwt-decode"

export default async (req, res, next) => {
  try {
    const token = req.params.token
    const decoded = await jwtDecode(token)
    const userId = decoded.userId
    const newPassword = req.body.password
    const hashedPass = await encryptPassword(newPassword)

    await connection.query("UPDATE user SET password = ? WHERE userId = ?", [hashedPass, userId])
    console.log("Password changed successfully!")
    return res.status(200).json({ message: "password changed successfully" })
  } catch (err) {
    next(err)
  }
}
