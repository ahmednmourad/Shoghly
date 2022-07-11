import Review from "../../services/review.js"

export default async (req, res, next) => {
  const clientId = req.userId
  const reviewId = req.params.reviewId
  const { rating, description } = req.body
  const review = { rating, description }

  try {
    if (!rating) throw new Error("No rating provided")
    if (!reviewId) throw new Error("No reviewId provided")

    await Review.update(reviewId, clientId, review)
    logger.info(`Review updated successfully. ReviewID: ${reviewId}`)

    return res.status(200).json({ message: "review edited successfully!" })
  } catch (error) {
    next(error)
  }
}
