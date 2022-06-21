import { UUID, TEXT, DATE, literal } from "sequelize"
import { define } from "../utils/database.js"

export default define("chat", {
  clientId: {
    type: UUID,
    primaryKey: true,
    allowNull: false,
    references: {
      model: "user",
      key: "userId"
    }
  },
  workerId: {
    type: UUID,
    primaryKey: true,
    allowNull: false,
    references: {
      model: "user",
      key: "userId"
    }
  },

  message: TEXT,
  createdAt: { type: DATE, allowNull: false, defaultValue: literal("CURRENT_TIMESTAMP") },
  updatedAt: { type: DATE, allowNull: false, defaultValue: literal("CURRENT_TIMESTAMP ON UPDATE CURRENT TIMESTAMP") }
})
