import User from "../../services/user.js"

export default async (req, res, next) => {
  const userId = req.userId

  try {
    await User.remove(userId)
    logger.info(`User ${userId} deleted successfully`)
    return res.status(200).json({ message: "User deleted successfully" })
  } catch (error) {
    next(error)
  }
}
