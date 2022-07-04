
"use strict"

import Message from "../models/message.js"

export const create = async (message) => {
  await Message.create(message)
}

export const list = async (userId) => {
  return await Message.findAll({ where: { senderId: userId } })
}

export default { create, list }
