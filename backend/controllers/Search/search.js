import connection from "../../utils/mysql.js"
import { CustomError } from "../../utils/error.js"

export default async (req, res, next) => {
  const { text, city, profession } = req.query

  try {
    if (!text) throw new CustomError(400, "Empty text field")
    if (!city) throw new CustomError(400, "No city Provided")

    const [rows] = await connection.query(`SELECT DISTINCT userId, CONCAT(firstName, ' ', lastName) as 'fullName', picture, profession, phone, city, line, email,  (SELECT AVG(rating) 
    FROM review WHERE review.workerId = user.userId) as rating 
    FROM user 
    LEFT JOIN review ON user.userId = review.workerId 
    WHERE CONCAT(firstName, ' ', lastName) LIKE ? AND role = 'worker' AND city = ? ${profession ? `AND profession = ${connection.escape(profession)}` : ""}`, ["%" + text + "%", city])

    res.status(200).json({ message: "Success", results: rows })
  } catch (err) {
    next(err)
  }
}
