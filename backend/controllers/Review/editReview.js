import connection from "../../util/mysql.js"
import { CustomError } from "../../util/error.js"

export default async (req, res, next) => {
  const clientId = req.userId
  const reviewId = req.params.reviewId
  const rating = parseInt(req.body.rating)
  const description = req.body.description

  try {
    if (!rating) throw new Error("No rating provided")
    if (!reviewId) throw new Error("No reviewId provided")

    const [rows] = await connection.query("UPDATE review SET rating = ? , description = ? WHERE reviewId =? AND clientId =?", [rating, description, reviewId, clientId])
    if (!rows.affectedRows) throw new CustomError(404, "review or client does not exist")

    return res.status(200).json({ message: "review edited successfully!" })
  } catch (error) {
    next(error)
  }
}
