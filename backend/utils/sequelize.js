import { Sequelize } from "sequelize"
import dotenv from "dotenv"
dotenv.config()

const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USERNAME, process.env.DB_PASSWORD, {
  dialect: "mysql",
  port: 3306,
  host: process.env.DB_HOSTNAME,
  define: {
    freezeTableName: true,
    timestamps: false
  },
  logging: false
})

export default sequelize
