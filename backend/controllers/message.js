import Message from "../services/message.js"
import User from "../services/user.js"
import { v4 as uuidv4 } from "uuid"

export const send = async (req, res, next) => {
  const messageId = uuidv4()
  const senderId = req.userId
  const { receiverId, text, attachment } = req.body
  const message = { messageId, senderId, receiverId, text, attachment }

  try {
    await Message.create(message)
    console.log("message saved successfully")

    const socketId = await User.getSocketId(receiverId)
    console.log("SocketId", socketId)

    if (socketId) {
      console.log(`Sending message to active user on socketId: ${socketId}`)
      req.app.io.to(socketId).emit("message", message) // missing createdAt !
    }

    return res.status(200).json({ message: "message sent successfully" })
  } catch (err) {
    next(err)
  }
}

export const list = async (req, res, next) => {
  const userId = req.userId

  try {
    const messages = await Message.list(userId)

    return res.status(200).json({ data: messages })
  } catch (err) {
    next(err)
  }
}

export default { send, list }
