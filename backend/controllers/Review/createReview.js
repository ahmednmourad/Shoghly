import connection from "../../util/mysql.js"
import { v4 as uuidv4 } from "uuid"
import { CustomError } from "../../util/error.js"

export default async (req, res, next) => {
  const reviewId = uuidv4()
  const clientId = req.userId
  const workerId = req.params.workerId
  const rating = parseInt(req.body.rating)
  const description = req.body.description
  const review = { reviewId, clientId, workerId, rating, description }

  try {
    if (!workerId) throw new CustomError(400, "No worker provided")
    if (!rating) throw new CustomError(400, "No rating provided")

    const clientRole = await getUserRole(clientId)
    const workerRole = await getUserRole(workerId)
    if (clientRole !== "client" && workerRole !== "worker") throw new CustomError(403, `${clientRole} is not permitted to create review for ${workerRole}`)

    await createReview(review)

    return res.status(201).json({ message: "review created!", reviewId })
  } catch (error) {
    next(error)
  }
}

const getUserRole = async (userId) => {
  const [rows] = await connection.query("SELECT role FROM user WHERE userId = ?", [userId])
  return rows[0].role
}

const createReview = async (review) => {
  try {
    await connection.query("INSERT INTO review SET ?", review)
  } catch (err) {
    if (err.errcode === 1062) throw new CustomError(429, "Cannot review a worker more than once")
  }
}
