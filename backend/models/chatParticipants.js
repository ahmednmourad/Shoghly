import Sequelize from "sequelize"
import sequelize from "../utils/sequelize.js"

export const ChatParticipant = sequelize.define("chatParticipant", {
  userId: { type: Sequelize.UUID, primaryKey: true, references: { model: "user", key: "userId" } },
  chatId: { type: Sequelize.STRING, primaryKey: true, references: { model: "chat", key: "chatId" } }
})

export default ChatParticipant
