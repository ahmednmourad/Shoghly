import Sequelize from "sequelize"
import sequelize from "../utils/sequelize.js"

export const Chat = sequelize.define("chat", {
  chatId: { type: Sequelize.STRING, primaryKey: true },
  lastMessage: { type: Sequelize.STRING },
  lastAttachment: { type: Sequelize.STRING },
  lastUserId: { type: Sequelize.STRING }
})

export default Chat
