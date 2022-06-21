
import { CustomError } from "../../util/error.js"

export default async (req, res, next) => {
  const city = req.query.city
  const profession = req.query.profession

  try {
    if (!city) throw new CustomError(400, "No city provided")
    if (!profession) throw new CustomError(400, "No profession provided")

    // const [rows] = await connection.execute("SELECT * FROM user WHERE role = 'worker' AND city = ? AND profession = ?", [city, profession])

    return res.status(200).json({ message: "data found", data: rows })
  } catch (err) {
    next(err)
  }
}
