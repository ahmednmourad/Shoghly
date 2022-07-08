"use strict"

import Project from "../../services/project.js"

export default async (req, res, next) => {
  const projectId = req.params.projectId

  try {
    const project = await Project.getById(projectId)

    return res.status(200).json({ project })
  } catch (err) {
    next(err)
  }
}
