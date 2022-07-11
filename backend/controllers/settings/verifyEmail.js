import User from "../../services/user.js"
import { CustomError } from "../../utils/error.js"

export default async (req, res, next) => {
  try {
    const { email, code } = req.body

    const user = await User.getByEmail(email)

    if (user.emailVerified) throw new CustomError(400, "Email already verified")
    if (user.emailConfirmationCode !== code) throw new CustomError(400, "Invalid code")
    if (user.emailCodeExpire < new Date()) throw new CustomError(400, "Confirmation code expired")

    await User.verifyEmail(email)

    logger.info(`Email ${email} verified successfully`)
    return res.status(200).json({ message: "Email verified successfully" })
  } catch (err) {
    next(err)
  }
}
