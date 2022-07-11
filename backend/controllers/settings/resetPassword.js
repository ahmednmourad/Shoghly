"use strict"

import User from "../../services/user.js"
import { encryptPassword } from "../../utils/passwords.js"
import jwt from "jsonwebtoken"

export default async (req, res, next) => {
  const token = req.params.token
  const newPassword = req.body.password

  try {
    const hashedPassword = await encryptPassword(newPassword)

    const decodedToken = jwt.verify(token, process.env.JWT_SECRET_KEY)
    if (!decodedToken) return res.status(401).json({ message: "Not authenticated, No authorization header" })
    const userId = decodedToken.userId

    await User.changePassword(userId, hashedPassword)
    logger.info("Password changed successfully!")
    return res.status(200).json({ message: "password changed successfully" })
  } catch (err) {
    next(err)
  }
}
