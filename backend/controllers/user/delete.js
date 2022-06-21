import connection from "../../util/mysql.js"

export default async (req, res, next) => {
  const userId = req.userId
  try {
    await connection.query("DELETE FROM user WHERE userId = ?", [userId])
    return res.status(200).json({ message: "User deleted successfully" })
  } catch (error) {
    next(error)
  }
}
