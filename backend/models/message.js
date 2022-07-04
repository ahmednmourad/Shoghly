import Sequelize from "sequelize"
import sequelize from "../utils/sequelize.js"
import User from "./user.js"

export const Message = sequelize.define("message", {
  messageId: { type: Sequelize.UUID, primaryKey: true },
  senderId: { type: Sequelize.UUID, allowNull: false, references: { model: "user", key: "userId" } },
  receiverId: { type: Sequelize.UUID, allowNull: false, references: { model: "user", key: "userId" } },
  text: { type: Sequelize.TEXT },
  attachment: { type: Sequelize.TEXT },
  isRead: { type: Sequelize.BOOLEAN, defaultValue: false }
}, { timestamps: true })

User.hasMany(Message, { foreignKey: "senderId" })
User.hasMany(Message, { foreignKey: "receiverId" })
Message.belongsTo(User, { as: "sender", foreignKey: "senderId" })
Message.belongsTo(User, { as: "receiver", foreignKey: "receiverId" })

export default Message
