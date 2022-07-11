import Review from "../../services/review.js"

export default async (req, res, next) => {
  const clientId = req.userId
  const reviewId = req.params.reviewId

  try {
    await Review.remove(reviewId, clientId)
    logger.info(`Review ${reviewId} deleted successfully`)

    return res.status(200).json({ message: "Review deleted successfully" })
  } catch (err) {
    next(err)
  }
}
