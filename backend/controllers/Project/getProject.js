import { CustomError } from "../../utils/error.js"
import connection from "../../utils/mysql.js"

export default async (req, res, next) => {
  const projectId = req.params.projectId

  try {
    const [rows] = await connection.query("SELECT project.projectId ,project.workerId ,project.description ,project.createdAt, project.updatedAt, json_arrayagg(picture.url) as photos FROM project JOIN picture using(projectId) WHERE projectId = ? group by project.projectId", [projectId])
    const project = rows[0]
    if (!project) throw new CustomError(404, "project not found")
    return res.status(200).json({ project })
  } catch (err) {
    next(err)
  }
}
