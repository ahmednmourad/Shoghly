import { UUID, DATE, literal } from "sequelize"

import { define } from "../utils/database.js"

export default define("favorite", {
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
  createdAt: { type: DATE, allowNull: false, defaultValue: literal("CURRENT_TIMESTAMP") }
})
