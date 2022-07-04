import connection from "../../util/mysql.js"
import { CustomError } from "../../util/error.js"

export default async (req, res, next) => {
  try {
    const userId = req.userId
    const { receiverId, message, photo } = req.body

    /* SELECT json_object("name", CONCAT(firstName, " ", lastName), "profilePicture", user.picture) as user, message, status, createdAt
    FROM chat JOIN user ON user.userId = chat.receiverId WHERE senderId = userId group by receiverId
    SELECT socketId FROM user WHERE userId = receiverId
    IF socketId = null DO NOTHING
    IF socket = value, socket.emit("message", {senderId, receiverId, message, photo, createdAt})
    */

    return res.status(200).json({ message: "message sent successfully" })
  } catch (err) {
    next(err)
  }
}
