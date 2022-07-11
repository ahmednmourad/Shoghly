"use strict"

import Project from "../../services/project.js"

export default async (req, res, next) => {
  const workerId = req.userId
  const projectId = req.params.projectId

  try {
    await Project.remove(projectId, workerId)

    logger.info("Project deleted")
    return res.status(200).json({ message: "Project deleted" })
  } catch (err) {
    next(err)
  }
}
