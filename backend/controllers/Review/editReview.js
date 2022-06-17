import connection from "../../util/mysql.js"
import { CustomError } from "../../util/error.js"

export default async (req, res, next) => {
  const clientId = req.userId
  const reviewId = req.params.reviewId
  const { rating, description } = req.body

  try {
    if (!rating) throw new Error("No rating provided")
    if (!reviewId) throw new Error("No reviewId provided")

    await updateReview({ rating, description }, reviewId, clientId)

    return res.status(200).json({ message: "review edited successfully!" })
  } catch (error) {
    next(error)
  }
}

const updateReview = async (review, reviewId, clientId) => {
  const [rows] = await connection.query("UPDATE review SET ? WHERE reviewId =? AND clientId =?", [review, reviewId, clientId])
  if (!rows.affectedRows) throw new CustomError(404, "review or client does not exist")
  return rows
}
