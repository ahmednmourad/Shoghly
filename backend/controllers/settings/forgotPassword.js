"use strict"

import User from "../../services/user.js"
import sendEmail from "../../utils/sendEmail.js"
import jwt from "jsonwebtoken"
import dotenv from "dotenv"
dotenv.config()

export default async (req, res, next) => {
  const email = req.body.email

  try {
    const user = await User.getByEmail(email)
    const token = jwt.sign({ userId: user.id, role: user.role }, process.env.JWT_SECRET_KEY, { expiresIn: "1h" })
    const link = `${process.env.DB_NAME}/reset-password/${token}`

    await sendEmail(email, "Password reset", link)
  } catch (err) {
    next(err)
  }

  return res.status(200).json({ message: "password reset link sent to your email account" })
}
