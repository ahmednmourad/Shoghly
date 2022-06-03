import Sequelize from "sequelize"
import sequelize from "../util/sequelize.js"

export default sequelize.define("review", {
  reviewId: {
    type: Sequelize.UUID,
    primaryKey: true
  },
  clientId: {
    type: Sequelize.UUID,
    allowNull: false,
    references: {
      model: "user",
      key: "userId"
    }
  },
  workerId: {
    type: Sequelize.UUID,
    allowNull: false,
    references: {
      model: "user",
      key: "userId"
    }
  },
  rating: { type: Sequelize.INTEGER, allowNull: false },
  description: { type: Sequelize.STRING },
  createdAt: { type: Sequelize.DATE, allowNull: false, defaultValue: Sequelize.literal("CURRENT_TIMESTAMP") },
  updatedAt: { type: Sequelize.DATE, allowNull: false, defaultValue: Sequelize.literal("CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP") }
},
{
  indexes: [
    {
      unique: true,
      fields: ["clientId", "workerId"]
    }
  ]
})
