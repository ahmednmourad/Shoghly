import User from "../../services/user.js"

export default async (req, res, next) => {
  const userId = req.userId

  try {
    const user = await User.getById(userId)
    return res.status(200).json({ message: "User is found", data: user })
  } catch (error) {
    next(error)
  }
}
