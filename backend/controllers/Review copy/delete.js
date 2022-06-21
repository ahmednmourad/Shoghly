import { CustomError } from "../../util/error.js"
import Review from "../../services/review.js"

export default async (req, res, next) => {
  const clientId = req.userId
  const reviewId = req.params.reviewId

  try {
    const count = await Review.remove(reviewId, clientId)
    if (count === 0) throw new CustomError(403, "the requesting is not permitted to delete this review")
    console.log(`Review ${reviewId} deleted successfully`)

    return res.status(200).json({ message: "Review deleted successfully" })
  } catch (err) {
    next(err)
  }
}
