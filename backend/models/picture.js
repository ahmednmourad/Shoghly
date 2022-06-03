import Sequelize from "sequelize"
import sequelize from "../util/sequelize.js"

export default sequelize.define("picture", {
  url: { type: Sequelize.STRING, unique: true, primaryKey: true },
  projectId: {
    type: Sequelize.UUID,
    allowNull: false,
    references: {
      model: "project",
      key: "projectId"
    },
    onDelete: "CASCADE"
  }
})
