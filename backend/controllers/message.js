import { v4 as uuidv4 } from "uuid"
import User from "../services/user.js"
import Message from "../services/message.js"
import Chat from "../services/chat.js"
import sequelize from "../utils/sequelize.js"

const send = async (req, res, next) => {
  const senderId = req.userId
  const { receiverId, text, attachment } = req.body

  const chatId = generateChatId(senderId, receiverId)
  logger.info("ChatID", chatId)
  const message = { messageId: uuidv4(), chatId, senderId, receiverId, text, attachment }

  let transaction

  try {
    transaction = await sequelize.transaction()

    const chat = await Chat.getById(chatId)

    if (!chat) {
      const chat = { chatId, lastMessage: text, lastAttachment: attachment, lastUserId: senderId }
      await Chat.create(chat, { transaction })

      const participants = [senderId, receiverId]
      await Chat.addParticipants(chatId, participants, { transaction })
    } else {
      const chat = { lastMessage: text, lastAttachment: attachment, lastUserId: senderId }
      await Chat.update(chatId, chat, { transaction })
    }

    await Message.create(message, { transaction })

    await transaction.commit()
  } catch (err) {
    await transaction.rollback()
    next(err)
  }

  try {
    const senderSocketId = await User.getSocketId(senderId)
    const receiverSocketId = await User.getSocketId(receiverId)

    const result = await Message.get(message.messageId)

    if (senderSocketId) {
      logger.info(`Sending message to sender on socketId: ${senderSocketId}`)
      result.isOwner = true
      req.app.io.to(senderSocketId).emit("message", result)
    }

    if (receiverSocketId) {
      logger.info(`Sending message to receiver on socketId: ${receiverSocketId}`)
      result.isOwner = false
      req.app.io.to(receiverSocketId).emit("message", result)
    }

    return res.status(200).json({ message: "message sent successfully" })
  } catch (err) {
    next(err)
  }
}

const list = async (req, res, next) => {
  const requestingUserId = req.userId
  const targetUserId = req.params.userId
  const chatId = generateChatId(requestingUserId, targetUserId)

  try {
    const messages = await Message.list(requestingUserId, chatId)

    return res.status(200).json({ data: messages })
  } catch (err) {
    next(err)
  }
}

const generateChatId = (senderId, receiverId) => {
  if (senderId < receiverId) return `${senderId}_${receiverId}`
  else return `${receiverId}_${senderId}`
}

const acknowledgeRead = async (req, res, next) => {
  const userId = req.userId
  const messageId = req.params.messageId

  try {
    await Message.acknowledgeRead(userId, messageId)

    return res.status(200).json({ message: "message read successfully" })
  } catch (err) {
    next(err)
  }
}

export default { send, list, acknowledgeRead }
