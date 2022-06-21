
import Review from "../../services/review.js"

export default async (req, res, next) => {
  const workerId = req.params.workerId

  try {
    const reviews = await Review.getAll(workerId)

    return res.status(200).json({ reviews })
  } catch (err) {
    next(err)
  }
}
