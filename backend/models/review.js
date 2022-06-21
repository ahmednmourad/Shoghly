import Sequelize from "sequelize"
import sequelize from "../utils/sequelize.js"
import User from "./user.js"

const Review = sequelize.define("review", {
  reviewId: {
    type: Sequelize.UUID,
    primaryKey: true
  },
  rating: { type: Sequelize.INTEGER, allowNull: false },
  description: { type: Sequelize.STRING }
},
{
  timestamps: true,
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
