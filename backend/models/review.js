import Sequelize from "sequelize"
import sequelize from "../util/sequelize.js"
import User from "./user.js"

const Review = sequelize.define("review", {
  reviewId: {
    type: Sequelize.UUID,
    primaryKey: true
  },
  // clientId: {
  //   type: Sequelize.UUID,
  //   allowNull: false,
  //   references: {
  //     model: "user",
  //     key: "userId"
  //   }
  // },
  // workerId: {
  //   type: Sequelize.UUID,
  //   allowNull: false,
  //   references: {
  //     model: "user",
  //     key: "userId"
  //   }
  // },
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

User.hasMany(Review, { foreignKey: "clientId" })
User.hasMany(Review, { foreignKey: "workerId" })

export default Review
