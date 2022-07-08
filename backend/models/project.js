import { Sequelize } from "sequelize"
import sequelize from "../utils/sequelize.js"
import User from "./user.js"

const Project = sequelize.define("project", {
  projectId: { type: Sequelize.UUID, primaryKey: true, allowNull: true },
  // workerId: {
  //   type: Sequelize.UUID,
  //   allowNull: false,
  //   references: {
  //     model: "user",
  //     key: "userId"
  //   }
  // },
  description: { type: Sequelize.STRING }
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

User.hasMany(Project, { foreignKey: "workerId" })
// Project.belongsTo(User)

export default Project
