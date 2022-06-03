import connection from "../../util/mysql.js"
import { v4 as uuidv4 } from "uuid"
import { CustomError } from "../../util/error.js"

export default async (req, res, next) => {
  const id = req.userId
  const { description, url } = req.body
  const projectId = uuidv4()
  const project = { projectId, workerId: id, description }

  try {
    const [rows] = await connection.query("SELECT role FROM user WHERE userId = ?", [id])
    const user = rows[0]
    if (user.role !== "worker") throw new CustomError(401, "Unauthorized to create projects")

    await connection.query("INSERT INTO project set ? ", [project])
    await connection.query("INSERT INTO picture set url = ?, projectId = ?", [url, projectId])

    console.log("Project created! :D \n For now projectId = " + projectId)
    return res.status(201).json({ message: "Project created!" })
  } catch (err) {
    next(err)
  }
}
