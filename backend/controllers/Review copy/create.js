import { v4 as uuidv4 } from "uuid"
import { CustomError } from "../../util/error.js"
import User from "../../services/user.js"
import Review from "../../services/review.js"

export default async (req, res, next) => {
  const reviewId = uuidv4()
  const clientId = req.userId
  const workerId = req.params.workerId
  const { rating, description } = req.body
  const review = { reviewId, clientId, workerId, rating, description }

  try {
    const user = await User.getById(workerId)
    if (user.role !== "worker") throw new CustomError(403, "Permission denied")

    await Review.create(review)
    // if (err.errno === 1062) throw new CustomError(429, "Cannot review a worker more than once")

    return res.status(201).json({ message: "review created successfully", data: { id: reviewId } })
  } catch (error) {
    next(error)
  }
}
