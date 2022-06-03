import { CustomError } from "../../util/error.js"
import connection from "../../util/mysql.js"

export default async (req, res, next) => {
  const workerId = req.userId
  const projectId = req.params.projectId
  try {
    const [rows] = await connection.query("DELETE FROM project WHERE workerId = ? AND projectId = ?", [workerId, projectId])
    if (!rows.affectedRows) throw new CustomError(403, "the requesting user is not permitted to delete project")
    console.log("Project deleted")
    return res.status(200).json({ message: "Project deleted" })
  } catch (err) {
    next(err)
  }
}
