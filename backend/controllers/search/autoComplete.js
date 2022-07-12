import connection from "../../utils/mysql.js"
import { CustomError } from "../../utils/error.js"

export default async (req, res, next) => {
  const text = req.query.text
  const city = req.query.city
  try {
    if (!text) throw new CustomError(400, "Empty text field")
    if (!city) throw new CustomError(400, "No city Provided")
    const [rows] = await connection.query("SELECT userId, picture, profession, CONCAT(firstName, ' ', lastName) as 'fullName' FROM user WHERE CONCAT(firstName, ' ', lastName) LIKE ? AND role = 'worker' AND city = ? LIMIT 10", ["%" + text + "%", city])

    res.status(200).json({ message: "Success", results: rows })
  } catch (err) {
    next(err)
  }
}
