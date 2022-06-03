import connection from "../../util/mysql.js"

export default async (req, res, next) => {
  const workerId = req.params.workerId

  try {
    const [projects] = await connection.query("SELECT * FROM project WHERE workerId = ? ", [workerId])
    console.log(projects)
    return res.status(200).json({ projects })
  } catch (err) {
    next(err)
  }
}
