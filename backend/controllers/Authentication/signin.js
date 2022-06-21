import { getUser } from "../../util/user.js"
import { comparePassword } from "../../util/passwords.js"
import jwt from "jsonwebtoken"
import dotenv from "dotenv"
import { CustomError } from "../../util/error.js"
dotenv.config()

export default async (req, res, next) => {
  const email = req.body.email
  const password = req.body.password

  try {
    if (!email) throw new CustomError(400, "No email provided")
    if (!password) throw new CustomError(400, "No password provided")

    const user = await getUser(email)

    const isValidPassword = await comparePassword(password, user.password)
    if (!isValidPassword) throw new CustomError(400, "incorrect email or password")

    const accessToken = jwt.sign({ userId: user.userId, userRole: user.role }, process.env.JWT_SECRET_KEY, { expiresIn: "365d" })
    console.log("Login successfull.", { UserID: user.userId, Role: user.role })
    return res.status(200).json({ message: "logged in successfully", accessToken, userId: user.userId })
  } catch (err) {
    next(err)
  }
}
