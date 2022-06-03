import connection from "../../util/mysql.js"
import { CustomError } from "../../util/error.js"

export default async (req, res, next) => {
  const clientId = req.userId
  const reviewId = req.params.reviewId

  try {
    if (!reviewId) throw new CustomError(400, "No review id provided")

    await deleteReview(clientId, reviewId)

    return res.status(200).json({ message: "review deleted!" })
  } catch (err) {
    next(err)
  }
}

const deleteReview = async (userId, reviewId) => {
  const [rows] = await connection.query("DELETE FROM review WHERE reviewId = ? AND clientId = ?", [reviewId, userId])
  if (!rows.affectedRows) throw new CustomError(403, "the requesting is not permitted to delete this review")
  return rows // For unit tests
}
