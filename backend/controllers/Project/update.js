"use strict"

import Project from "../../services/project.js"
import sequelize from "../../utils/sequelize.js"

export default async (req, res, next) => {
  const workerId = req.userId
  const projectId = req.params.projectId
  logger.info("workerId", workerId, "workerId", projectId)
  const { description, urls } = req.body

  const project = { description }
  let transaction

  try {
    transaction = await sequelize.transaction()

    const photosPayload = getPhotosPayload(urls, projectId)
    logger.info(photosPayload)

    await Project.isWorkerProject(projectId, workerId)

    logger.info("updating project")
    await Project.update(projectId, workerId, project)
    logger.info("Project updated")

    logger.info("Deleting photos")
    await Project.deletePhotos(projectId, urls)
    logger.info("Photos deleted")

    logger.info("adding photos")
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
