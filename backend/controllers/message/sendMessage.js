import connection from "../../util/mysql.js"
import { CustomError } from "../../util/error.js"

export const send (req, res, next) => {
  const senderId = req.userId
  const { receiverId, message, photo } = req.body
  try {

    // INSERT INTO chat (senderId, receiverId, message, photo, "sent", createdAt)
    // SELECT socketId FROM user WHERE userId = receiverId
    // IF socketId = null DO NOTHING
    // IF socket = value, socket.emit("message", { senderId, receiverId, message, photo, createdAt })

    return res.status(200).json({ message: "message sent successfully" })
  } catch (err) {
    next(err)
  }
}
