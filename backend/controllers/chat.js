"use strict"

import Chat from "../services/chat.js"

const list = async (req, res, next) => {
  const userId = req.userId

  try {
    const chats = await Chat.list(userId)

    return res.status(200).json({ data: chats })
  } catch (err) {
    next(err)
  }
}

export default { list }
