import { CustomError } from "../../util/error.js"
import connection from "../../util/mysql.js"

export default async (req, res) => {
  const projectId = req.params.projectId

  try {
    const [rows] = await connection.query("SELECT * from project WHERE projectId = ?", [projectId])
    const project = rows[0]
    if (!project) throw new CustomError(404, "project not found")

    return res.status(200).json({ project })
  } catch (err) {
    console.log(err)
    return res.status(500).json({ message: "Can't get the project", err })
  }
}
