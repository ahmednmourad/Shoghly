import User from "../../services/user.js"
import { comparePassword } from "../../utils/passwords.js"
import jwt from "jsonwebtoken"
import dotenv from "dotenv"
import { CustomError } from "../../utils/error.js"
dotenv.config()

export default async (req, res, next) => {
  const { email, password } = req.body

  try {
    const user = await User.getByEmail(email)

    const isValidPassword = await comparePassword(password, user.password)
    if (!isValidPassword) throw new CustomError(400, "incorrect email or password")

    const accessToken = jwt.sign({ email, userId: user.userId, role: user.role }, process.env.JWT_SECRET_KEY, { expiresIn: "365d" })
    logger.info("Login successful.", { UserID: user.userId, Role: user.role })
    return res.status(200).json({ message: "logged in successfully", accessToken, userId: user.userId })
  } catch (err) {
    next(err)
  }
}
