import connection from "../../util/mysql.js"
import { CustomError } from "../../util/error.js"

export default async (req, res, next) => {
  const text = req.query.text
  try {
    if (!text) throw new CustomError(404, "can not find workers. Empty query parameter")
    const [rows] = await connection.query(`SELECT userId, picture, profession, phone, city, line, email, CONCAT(firstName, ' ', lastName) as 'fullName' FROM user WHERE CONCAT(firstName, ' ', lastName) LIKE '%${text}%' AND role = 'worker'`)
    const results = rows
    console.log(results)
    res.status(200).json({ message: "workers found.", results })
  } catch (err) {
    next(err)
  }
}
