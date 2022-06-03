import { CustomError } from "../../util/error.js"
import connection from "../../util/mysql.js"

export default async (req, res, next) => {
  const userId = req.userId
  const projectId = req.params.projectId
  const description = req.body.description
  try {
    const [rows] = await connection.query("UPDATE project set description = ? WHERE workerId = ? AND projectId = ?", [description, userId, projectId])
    if (!rows.affectedRows) throw new CustomError(403, "The requesting user is not permitted to update project")
    console.log("Post edited :D")
    return res.status(200).json({ message: "Project edited" })
  } catch (error) {
    next(error)
  }
}
