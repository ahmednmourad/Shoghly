import connection from "../../util/mysql.js"
import { CustomError } from "../../util/error.js"

export default async (req, res, next) => {
  const workerId = req.params.workerId

  try {
    if (!workerId) throw new CustomError(400, "No worker provided")

    const reviews = await getReviews(workerId)

    return res.status(200).json({ reviews })
  } catch (err) {
    next(err)
  }
}

const getReviews = async (userId) => {
  const [reviews] = await connection.query("SELECT * FROM review WHERE workerId = ? ", [userId])
  return reviews
}
