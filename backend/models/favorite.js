import Sequelize from "sequelize"
import sequelize from "../utils/sequelize.js"
import User from "./user.js"

const Favorite = sequelize.define("favorite", {
  clientId: {
    type: Sequelize.UUID,
    primaryKey: true,
    allowNull: false,
    references: {
      model: "user",
      key: "userId"
    }
  },
  workerId: {
    type: Sequelize.UUID,
    primaryKey: true,
    allowNull: false,
    references: {
      model: "user",
      key: "userId"
    }
  },
  createdAt: { type: Sequelize.DATE, allowNull: false, defaultValue: Sequelize.literal("CURRENT_TIMESTAMP") }
})

User.hasMany(Favorite, { foreignKey: "clientId" })
User.hasMany(Favorite, { foreignKey: "workerId" })
Favorite.belongsTo(User, { as: "client", foreignKey: "clientId" })
Favorite.belongsTo(User, { as: "worker", foreignKey: "workerId" })

export default Favorite
