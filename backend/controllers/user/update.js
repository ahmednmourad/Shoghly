import User from "../../services/user.js"

export default async (req, res, next) => {
  const userId = req.userId
  const { firstName, lastName, phone, gender, country, city, line } = req.body

  try {
    const user = { firstName, lastName, phone, gender, country, city, line }
    await User.update(userId, user)
    console.log(`User ${userId} updated successfully`)

    return res.status(200).json({ message: "User updated successfully" })
  } catch (error) {
    next(error)
  }
}
