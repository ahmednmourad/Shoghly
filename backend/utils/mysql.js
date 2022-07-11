import db from "mysql2/promise"
import dotenv from "dotenv"
dotenv.config()

const config = {
  host: process.env.DB_HOSTNAME,
  user: process.env.DB_USERNAME,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD
}
const connection = db.createPool(config)

// const findOne = async (sql, params) => {
//   const [rows] = await connection.execute(sql, params)
//   return rows[0]
// }

// const execute = async(sql, params) => {
//   const [rows] = await connection.execute(sql, params)
//   return rows
// }

// const query = async(sql , params)=>{
//   const [rows] = await connection.query(sql,params)
//   return rows
// }

export default connection
