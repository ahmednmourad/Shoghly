import connection from "../../util/mysql.js"
import { v4 as uuidv4 } from "uuid"
import { CustomError } from "../../util/error.js"

export default async (req, res, next) => {
  const id = req.userId
  const { description, url } = req.body
  const projectId = uuidv4()
  const project = { projectId, workerId: id, description }

  try {
    if (!url) throw new CustomError(400, "No Url provided")
    if (!Array.isArray(url)) throw new CustomError(400, "Urls must be in Array")
    if (!description) throw new CustomError(400, "NO Description provided")

    const [rows] = await connection.query("SELECT role FROM user WHERE userId = ?", [id])
    const user = rows[0]

    if (user.role !== "worker") throw new CustomError(401, "Unauthorized to create projects")
  } catch (err) {
    next(err)
  }
  const projectPictures = getProjectPictures(url, projectId)
  try {
    await connection.query("START TRANSACTION")
    await connection.query("INSERT INTO project set ? ", [project])
    await connection.query("INSERT INTO picture (url , projectId) VALUES ?", [projectPictures])
    await connection.query("COMMIT")
    console.log("Project created! " + projectId)
    return res.status(201).json({ message: "Project created!", projectId })
  } catch (err) {
    await connection.query("ROLLBACK")
    next(err)
  }
}
const getProjectPictures = (urls, projectId) => {
  return urls.map(url => [url, projectId])
}
