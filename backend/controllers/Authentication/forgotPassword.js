import sendEmail from "../../util/sendEmail.js"
import { getUser } from "../../util/user.js"
import jwt from "jsonwebtoken"
import dotenv from "dotenv"
dotenv.config()

export default async (req, res, next) => {
  try {
    const email = req.body.email
    const user = await getUser(email)
    const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET_KEY, { expiresIn: "1h" })
    const link = `${process.env.DB_NAME}/resetPassword/${token}`

    await sendEmail(email, "Password reset", link)
  } catch (err) {
    next(err)
  }

  return res.status(200).json({ message: "password reset link sent to your email account" })
}
