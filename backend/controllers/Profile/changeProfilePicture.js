import connection from "../../util/mysql.js"

export default async (req, res, next) => {
  const id = req.userId
  const picture = req.body.picture
  try {
    await connection.query("UPDATE user SET picture = ? WHERE userId = ?", [picture, id])
    return res.status(200).json({ message: "Profile picture changed successfully", picture })
  } catch (err) {
    next(err)
  }
}
