"use strict"

import { v4 as uuidv4 } from "uuid"
import sequelize from "../../utils/sequelize.js"
import Project from "../../services/project.js"

export default async (req, res, next) => {
  const id = req.userId
  const { description, urls } = req.body

  const projectId = uuidv4()
  const project = { projectId, workerId: id, description }
  let transaction

  try {
    transaction = await sequelize.transaction()

    logger.info("Creating project")
    await Project.create(project)
    logger.info(`Success, project created. ProjectID: ${projectId}`)

    const photosPayload = getPhotosPayload(urls, projectId)
    logger.info(photosPayload)
    logger.info("Adding project photos")
    await Project.addPhotos(photosPayload)
    logger.info("Success, Project photos added.")

    await transaction.commit()

    return res.status(201).json({ message: "Project created!", data: { id: projectId } })
  } catch (err) {
    await transaction.rollback()
    next(err)
  }
}

const getPhotosPayload = (urls, projectId) => {
  return urls.map(url => { return { url, projectId } })
}
