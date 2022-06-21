import connection from "../../util/mysql.js"

export default async (req, res, next) => {
  const workerId = req.params.workerId

  try {
    const [projects] = await connection.query(`SELECT project.projectId, project.description, project.createdAt, project.updatedAt, json_arrayagg(picture.url) as pictures FROM project 
    JOIN picture using(projectId) 
    WHERE workerId = ?
    group by project.projectId`, [workerId])
    console.log("Projects : " + projects)
    return res.status(200).json({ projects })
  } catch (err) {
    next(err)
  }
}
