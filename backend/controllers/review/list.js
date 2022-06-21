
import Review from "../../services/review.js"

export default async (req, res, next) => {
  const workerId = req.params.workerId

  try {
    const reviews = await Review.list(workerId)

    return res.status(200).json({ data: reviews })
  } catch (err) {
    next(err)
  }
}
