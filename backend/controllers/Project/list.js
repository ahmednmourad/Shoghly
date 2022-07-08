"use strict"

import Project from "../../services/project.js"

export default async (req, res, next) => {
  const workerId = req.params.workerId

  try {
    const projects = await Project.list(workerId)

    return res.status(200).json({ message: "Success", data: projects })
  } catch (err) {
    next(err)
  }
}
