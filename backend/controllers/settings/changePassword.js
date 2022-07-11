import User from "../../services/user.js"
import { comparePassword, encryptPassword } from "../../utils/passwords.js"
import { CustomError } from "../../utils/error.js"

export default async (req, res, next) => {
  const { userId, email } = req
  const { oldPassword, newPassword } = req.body

  try {
    const user = await User.getByEmail(email)

    const isValidPassword = await comparePassword(oldPassword, user.password)
    if (!isValidPassword) throw new CustomError(400, "invalid password")

    if (oldPassword === newPassword) throw new CustomError(400, "old and new passwords must be different")
    const hashedPassword = await encryptPassword(newPassword)

    await User.changePassword(userId, hashedPassword)
    logger.info("Password changed successfully!")
    return res.status(200).json({ message: "password changed successfully" })
  } catch (err) {
    next(err)
  }
}
