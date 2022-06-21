import { CustomError } from "../../utils/error.js"
import connection from "../../utils/mysql.js"

export default async (req, res, next) => {
  const workerId = req.workerId
  const projectId = req.params.projectId
  const { description, urls } = req.body
  try {
    if (!description && !urls) throw new CustomError(400, "NO change provided!")

    const existingPhotos = await existingProjectPicture(projectId)

    const [rows] = await connection.query("UPDATE project set description = ? WHERE workerId = ? AND projectId = ?", [description, workerId, projectId])
    if (!rows.affectedRows) throw new CustomError(403, "The requesting user is not permitted to update project")
    console.log("Post edited :D")
    return res.status(200).json({ message: "Project edited" })
  } catch (error) {
    next(error)
  }
}

const updateProject = async (project, projectId, workerId) => await connection.query("UPDATE project SET ? WHERE workerId = ? AND projectId = ?", [project, workerId, projectId])

const existingProjectPicture = async projectId => {
  const [urls] = await connection.query("SELECT url FROM picture WHERE projectId = ?", projectId)
  return urls
}

const addProjectPictures = async (urls, projectId) => await connection.query("INSERT INTO picture (url , projectId) VALUES ? ", [urls, projectId])

const deleteProjectPictures = async (urls) => await connection.query("DELETE FROM picture WHERE url IN ?", urls)
