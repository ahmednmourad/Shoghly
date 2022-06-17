import { CustomError } from "../../util/error.js"
import connection from "../../util/mysql.js"

export default async (req, res, next) => {
  const projectId = req.params.projectId

  try {
    const [rows] = await connection.query("SELECT project.*, picture.url as pictures from project LEFT JOIN picture ON project.projectId = picture.projectId WHERE project.projectId = ?", [projectId])
    const project = rows[0]
    if (!project) throw new CustomError(404, "project not found")
    const [photos] = await connection.query("SELECT url from picture WHERE projectId = ? ", [projectId])
    return res.status(200).json({ project, photos })
  } catch (err) {
    next(err)
  }
}
