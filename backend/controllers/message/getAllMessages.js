import connection from "../../util/mysql.js"
import { CustomError } from "../../util/error.js"

export default async (req, res, next) => {
  try {
    const requestingUserId = req.userId
    const { targetUserId } = req.body

    /* SELECT * FROM chat WHERE receiverId = targetUserId ORDER BY createdAt */

    return res.status(200).json({ message: "message sent successfully" })
  } catch (err) {
    next(err)
  }
}
