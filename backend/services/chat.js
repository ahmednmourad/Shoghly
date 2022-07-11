"use strict"

import Chat from "../models/chat.js"
import ChatParticipant from "../models/chatParticipants.js"
import sequelize from "../utils/sequelize.js"

const create = async (chat, options) => {
  logger.info("Creating chat")
  await Chat.create(chat, options)
  logger.info("Success, chat created.")
}

const addParticipants = async (chatId, participants, options) => {
  const payload = participants.map(participant => {
    return { chatId, userId: participant }
  })

  logger.info("Adding chat participants")
  await ChatParticipant.bulkCreate(payload, options)
  logger.info("chat participants added")
}

const update = async (chatId, chat, options) => {
  logger.info("Updating chat")
  await Chat.update(chat, { where: { chatId }, ...options })
  logger.info("Success, chat updated.")
}

const getById = async (chatId) => {
  return await Chat.findByPk(chatId)
}

const list = async (userId) => {
  return await sequelize.query(`select lastMessage, lastAttachment, lastUserId,
    json_object('id', user.userId, 'firstName', user.firstName, 'lastName', user.lastName, 'picture', user.picture) as user
    from chatParticipant 
    inner join user using (userId)
    inner join chat using (chatId)
    where  chatId in (select chatId from chatParticipant where userId = :userId)
    and userId <> :userId`, {
    replacements: { userId },
    type: sequelize.QueryTypes.SELECT,
    raw: true
  })
}

export default { create, update, addParticipants, getById, list }
