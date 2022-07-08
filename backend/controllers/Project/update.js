"use strict"

import Project from "../../services/project.js"
import sequelize from "../../utils/sequelize.js"

export default async (req, res, next) => {
  const workerId = req.userId
  const projectId = req.params.projectId
  console.log("workerId", workerId, "workerId", projectId)
  const { description, urls } = req.body

  const project = { description }
  let transaction

  try {
    transaction = await sequelize.transaction()

    const photosPayload = getPhotosPayload(urls, projectId)
    console.log(photosPayload)

    await Project.isWorkerProject(projectId, workerId)

    console.log("updating project")
    await Project.update(projectId, workerId, project)
    console.log("Project updated")

    console.log("Deleting photos")
    await Project.deletePhotos(projectId, urls)
    console.log("Photos deleted")

    console.log("adding photos")
    await Project.addPhotos(photosPayload)

    await transaction.commit()

    return res.status(200).json({ message: "Project edited" })
  } catch (error) {
    await transaction.rollback()
    next(error)
  }
}

const getPhotosPayload = (urls, projectId) => {
  return urls.map(url => { return { url, projectId } })
}
