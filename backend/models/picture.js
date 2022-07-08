import Sequelize from "sequelize"
import sequelize from "../utils/sequelize.js"
import Project from "./project.js"

const Photo = sequelize.define("picture", {
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

export default Photo

Project.hasMany(Photo, { foreignKey: "projectId" })
