import connection from "../../util/mysql.js"
import { CustomError } from "../../util/error.js"

export default async (req, res, next) => {
  try {
    const userId = req.userId
    const messageId = req.params.messageId

    /* UPDATE chat SET status = "seen" WHERE messageId = messageId */

    return res.status(200).json({ message: "message sent successfully" })
  } catch (err) {
    next(err)
  }
}
