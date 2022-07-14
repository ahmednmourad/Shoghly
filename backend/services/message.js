
"use strict"

import Message from "../models/message.js"
import { CustomError } from "../utils/error.js"
import sequelize from "../utils/sequelize.js"

const create = async (message, options) => {
  logger.info("Creating message")
  await Message.create(message, options)
  logger.info("Success, message created.")
}

const acknowledgeRead = async (receiverId, messageId) => {
  const [count] = await Message.update({ isRead: true }, { where: { receiverId, messageId } })
  if (count === 0) throw new CustomError(404, "Message not found")
}

const list = async (userId, chatId) => {
  const messages = await Message.findAll({
    attributes: ["messageId", "senderId", "receiverId", [sequelize.literal("if(senderId = :userId, true, false)"), "isOwner"], "text", "attachment", "isRead", "createdAt", "updatedAt"],
    replacements: { userId },
    order: [["createdAt", "desc"]],
    where: { chatId },
    raw: true
  })
  messages.forEach(message => {
    message.isOwner = !!message.isOwner
    message.isRead = !!message.isRead
  })
  return messages
}

const get = async (userId, messageId) => {
  const message = await Message.findOne({
    attributes: ["messageId", "senderId", "receiverId", [sequelize.literal("if(senderId = :userId, true, false)"), "isOwner"], "text", "attachment", "isRead", "createdAt", "updatedAt"],
    replacements: { userId },
    order: [["createdAt", "desc"]],
    where: { messageId },
    raw: true
  })
  message.isOwner = !!message.isOwner
  message.isRead = !!message.isRead

  return message
}

export default { create, list, acknowledgeRead, get }
