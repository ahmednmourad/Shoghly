import { CustomError } from "../../util/error.js"
import connection from "../../util/mysql.js"

export default async (req, res, next) => {
  const id = req.params.userId
  try {
    const [rows] = await connection.query("SELECT userId AS id, firstName, lastName, phone, picture, role, profession, gender, country, city, line, avg(rating) as rating FROM user LEFT JOIN review ON user.userId = review.workerId WHERE user.userId = ?", [id])
    const user = rows[0]
    if (!user.id) throw new CustomError(404, "User not found!")
    return res.status(200).json({ message: "User is found", info: user })
  } catch (error) {
    next(error)
  }
}
