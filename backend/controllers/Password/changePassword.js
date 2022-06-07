import connection from "../../util/mysql.js"
import { getUserById } from "../../util/user.js"
import { comparePassword, encryptPassword } from "../../util/passwords.js"
import { CustomError } from "../../util/error.js"

export default async (req, res, next) => {
  try {
    const userId = req.userId
    const { oldPassword, newPassword } = req.body
    console.log(newPassword)

    if (oldPassword === newPassword) throw new CustomError(400, "old and new passwords must be different")

    const user = await getUserById(userId)

    const isValidPassword = await comparePassword(oldPassword, user.password)
    if (!isValidPassword) throw new CustomError(400, "invalid password")

    const hashedPass = await encryptPassword(newPassword)

    await connection.query("UPDATE user SET password = ? WHERE userId = ?", [hashedPass, userId])
    console.log("Password changed successfully!")
    return res.status(200).json({ message: "password changed successfully" })
  } catch (err) {
    next(err)
  }
}
