import connection from "../../util/mysql.js"
import { CustomError } from "../../util/error.js"

export default async (req, res, next) => {
  const id = req.userId
  const picture = req.body
  try {
    if (!picture) throw new CustomError(400, "picture not provided")

    await connection.query("UPDATE user SET picture = ? WHERE userId = ?", [picture, id])
    return res.status(200).json({ message: "Profile picture changed successfully" })
  } catch (err) {
    next(err)
  }
}
