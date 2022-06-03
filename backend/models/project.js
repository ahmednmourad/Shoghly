import { Sequelize } from "sequelize"
import sequelize from "../util/sequelize.js"

export default sequelize.define("project", {
  projectId: { type: Sequelize.UUID, primaryKey: true, allowNull: true },
  workerId: {
    type: Sequelize.UUID,
    allowNull: false,
    references: {
      model: "user",
      key: "userId"
    }
  },
  description: { type: Sequelize.STRING },
  createdAt: { type: Sequelize.DATE, allowNull: false, defaultValue: Sequelize.literal("CURRENT_TIMESTAMP") },
  updatedAt: { type: Sequelize.DATE, allowNull: false, defaultValue: Sequelize.literal("CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP") }
}
,
{
  indexes: [
    {
      unique: false,
      fields: ["workerId"]
    }
  ]
})
